from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from django.utils.html import format_html
from django.urls import reverse
from django.utils import timezone
from .models import Inquiry, InquiryFollowUp

class InquiryFollowUpInline(TabularInline):
    model = InquiryFollowUp
    extra = 0
    fields = ('follow_up_date', 'method', 'staff_member', 'notes')
    readonly_fields = ('created_at',)

@admin.register(Inquiry)
class InquiryAdmin(ModelAdmin):
    list_display = [
        'customer_info', 'inquiry_type_badge', 'subject_preview', 
        'status_badge', 'priority_badge', 'service_name', 
        'event_info', 'created_at', 'assigned_to'
    ]
    list_filter = [
        'inquiry_type', 'status', 'priority', 'source', 
        'created_at', 'event_date'
    ]
    search_fields = [
        'name', 'email', 'phone', 'subject', 'message', 
        'service_name', 'event_location'
    ]
    readonly_fields = ['id', 'created_at', 'updated_at', 'response_time']
    date_hierarchy = 'created_at'
    list_per_page = 25
    
    fieldsets = (
        ('👤 Customer Information', {
            'fields': ('name', 'email', 'phone'),
            'classes': ('wide',)
        }),
        ('📝 Inquiry Details', {
            'fields': ('inquiry_type', 'subject', 'message', 'source'),
            'classes': ('wide',)
        }),
        ('🛍️ Service Information', {
            'fields': ('service_name', 'service_id'),
            'classes': ('collapse',)
        }),
        ('🎉 Event Details', {
            'fields': ('event_date', 'event_location', 'budget_range'),
            'classes': ('collapse',)
        }),
        ('⚙️ Management', {
            'fields': ('status', 'priority', 'assigned_to', 'notes'),
            'classes': ('wide',)
        }),
        ('🕒 Timeline', {
            'fields': ('id', 'created_at', 'updated_at', 'responded_at', 'response_time'),
            'classes': ('collapse',)
        }),
    )
    
    def customer_info(self, obj):
        """Display customer name with contact icons"""
        info = f"<strong>{obj.name}</strong><br>"
        if obj.phone:
            info += f"📞 {obj.phone}<br>"
        if obj.email:
            info += f"✉️ {obj.email}"
        return format_html(info)
    customer_info.short_description = 'Customer'
    
    def inquiry_type_badge(self, obj):
        """Display inquiry type with emoji"""
        type_emojis = {
            'general': '💬',
            'booking': '📅',
            'pricing': '💰',
            'service': '🛍️',
            'complaint': '❗',
            'other': '📋'
        }
        emoji = type_emojis.get(obj.inquiry_type, '📋')
        return format_html(
            '<span style="background: #f8f9fa; padding: 4px 8px; border-radius: 6px; border-left: 3px solid #B22222;">{} {}</span>',
            emoji, obj.get_inquiry_type_display()
        )
    inquiry_type_badge.short_description = 'Type'
    
    def subject_preview(self, obj):
        """Display subject with truncation"""
        if obj.subject:
            return obj.subject[:40] + '...' if len(obj.subject) > 40 else obj.subject
        return "No subject"
    subject_preview.short_description = 'Subject'
    
    def event_info(self, obj):
        """Display event information"""
        if obj.event_date or obj.event_location:
            info = ""
            if obj.event_date:
                info += f"📅 {obj.event_date.strftime('%b %d, %Y')}<br>"
            if obj.event_location:
                info += f"📍 {obj.event_location}"
            return format_html(info)
        return "No event details"
    event_info.short_description = 'Event Info'
    
    def response_time(self, obj):
        """Calculate and display response time"""
        if obj.responded_at and obj.created_at:
            delta = obj.responded_at - obj.created_at
            hours = delta.total_seconds() / 3600
            if hours < 24:
                return format_html(
                    '<span style="color: #28a745; font-weight: bold;">{:.1f} hours</span>',
                    hours
                )
            else:
                days = hours / 24
                return format_html(
                    '<span style="color: #fd7e14; font-weight: bold;">{:.1f} days</span>',
                    days
                )
        return "Not responded"
    response_time.short_description = 'Response Time'
    
    inlines = [InquiryFollowUpInline]
    
    actions = ['mark_as_contacted', 'mark_as_in_progress', 'mark_as_completed']
    
    def status_badge(self, obj):
        """Enhanced status badge with emojis"""
        status_config = {
            'new': {'color': '#dc3545', 'emoji': '🆕'},
            'contacted': {'color': '#fd7e14', 'emoji': '📞'}, 
            'in_progress': {'color': '#0d6efd', 'emoji': '⏳'},
            'completed': {'color': '#198754', 'emoji': '✅'},
            'cancelled': {'color': '#6c757d', 'emoji': '❌'}
        }
        config = status_config.get(obj.status, {'color': '#6c757d', 'emoji': '❓'})
        return format_html(
            '<span style="background-color: {}; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">{} {}</span>',
            config['color'], config['emoji'], obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def priority_badge(self, obj):
        """Enhanced priority badge with emojis"""
        priority_config = {
            'low': {'color': '#198754', 'emoji': '🟢'},
            'medium': {'color': '#fd7e14', 'emoji': '🟡'},
            'high': {'color': '#dc3545', 'emoji': '🔴'}, 
            'urgent': {'color': '#8B0000', 'emoji': '🚨'}
        }
        config = priority_config.get(obj.priority, {'color': '#6c757d', 'emoji': '⚪'})
        return format_html(
            '<span style="background-color: {}; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">{} {}</span>',
            config['color'], config['emoji'], obj.get_priority_display()
        )
    priority_badge.short_description = 'Priority'
    
    def mark_as_contacted(self, request, queryset):
        count = 0
        for inquiry in queryset:
            if inquiry.status == 'new':
                inquiry.mark_as_contacted()
                count += 1
        self.message_user(request, f'{count} inquiries marked as contacted.')
    mark_as_contacted.short_description = "Mark selected inquiries as contacted"
    
    def mark_as_in_progress(self, request, queryset):
        count = queryset.update(status='in_progress')
        self.message_user(request, f'{count} inquiries marked as in progress.')
    mark_as_in_progress.short_description = "Mark selected inquiries as in progress"
    
    def mark_as_completed(self, request, queryset):
        count = queryset.update(status='completed')
        self.message_user(request, f'{count} inquiries marked as completed.')
    mark_as_completed.short_description = "Mark selected inquiries as completed"
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)

@admin.register(InquiryFollowUp)
class InquiryFollowUpAdmin(ModelAdmin):
    list_display = ['inquiry', 'follow_up_date', 'method', 'staff_member', 'created_at']
    list_filter = ['method', 'follow_up_date', 'created_at']
    search_fields = ['inquiry__name', 'inquiry__email', 'notes', 'staff_member']
    date_hierarchy = 'follow_up_date'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('inquiry')

