from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Inquiry
from .serializers import InquirySerializer, InquiryCreateSerializer

@api_view(['POST'])
def create_inquiry(request):
    """
    Create a new inquiry from the modal form
    """
    serializer = InquiryCreateSerializer(data=request.data)
    
    if serializer.is_valid():
        inquiry = serializer.save()
        
        # Send confirmation email to customer (optional)
        try:
            send_mail(
                subject=f'Thank you for your inquiry - {inquiry.subject}',
                message=f'''
Dear {inquiry.name},

Thank you for your inquiry about {inquiry.service_name or inquiry.subject}.

We have received your message:
"{inquiry.message}"

Our team will get back to you within 24 hours.

Best regards,
Chabighar Team
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[inquiry.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Email sending failed: {e}")
        
        # Send notification email to admin (optional)
        try:
            send_mail(
                subject=f'New Inquiry: {inquiry.subject}',
                message=f'''
New inquiry received:

Name: {inquiry.name}
Email: {inquiry.email}
Phone: {inquiry.phone}
Type: {inquiry.get_inquiry_type_display()}
Service: {inquiry.service_name or 'N/A'}
Subject: {inquiry.subject}

Message:
{inquiry.message}

Event Date: {inquiry.event_date or 'N/A'}
Location: {inquiry.event_location or 'N/A'}
Budget: {inquiry.budget_range or 'N/A'}

View in admin: http://localhost:8000/admin/inquiry/inquiry/{inquiry.id}/change/
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['admin@chabighar.com'],  # Replace with actual admin email
                fail_silently=True,
            )
        except Exception as e:
            print(f"Admin notification email failed: {e}")
        
        return Response({
            'message': 'Inquiry submitted successfully!',
            'inquiry_id': str(inquiry.id)
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'error': 'Invalid data',
        'details': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def inquiry_list(request):
    """
    Get list of inquiries (for admin use)
    """
    inquiries = Inquiry.objects.all().order_by('-created_at')
    
    # Filter by status if provided
    status_filter = request.GET.get('status')
    if status_filter:
        inquiries = inquiries.filter(status=status_filter)
    
    # Filter by inquiry type if provided
    type_filter = request.GET.get('type')
    if type_filter:
        inquiries = inquiries.filter(inquiry_type=type_filter)
    
    # Pagination
    page_size = int(request.GET.get('page_size', 20))
    page = int(request.GET.get('page', 1))
    start = (page - 1) * page_size
    end = start + page_size
    inquiries_page = inquiries[start:end]
    
    serializer = InquirySerializer(inquiries_page, many=True)
    
    return Response({
        'inquiries': serializer.data,
        'total': inquiries.count(),
        'page': page,
        'page_size': page_size,
        'has_next': end < inquiries.count()
    })

@api_view(['GET'])
def inquiry_stats(request):
    """
    Get inquiry statistics for dashboard
    """
    total_inquiries = Inquiry.objects.count()
    new_inquiries = Inquiry.objects.filter(status='new').count()
    in_progress = Inquiry.objects.filter(status='in_progress').count()
    completed = Inquiry.objects.filter(status='completed').count()
    
    # Inquiries by type
    inquiries_by_type = {}
    for choice in Inquiry.INQUIRY_TYPES:
        inquiries_by_type[choice[0]] = Inquiry.objects.filter(inquiry_type=choice[0]).count()
    
    return Response({
        'total_inquiries': total_inquiries,
        'new_inquiries': new_inquiries,
        'in_progress': in_progress,
        'completed': completed,
        'inquiries_by_type': inquiries_by_type
    })
