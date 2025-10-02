"""
Health check views for production monitoring
"""
import json
from django.http import JsonResponse
from django.views import View
from django.db import connection
from django.core.cache import cache
from django.conf import settings
import time


class HealthCheckView(View):
    """
    Health check endpoint for monitoring service status
    """
    
    def get(self, request):
        """
        Return health status of the application
        """
        start_time = time.time()
        
        health_status = {
            'status': 'healthy',
            'timestamp': int(time.time()),
            'version': '1.0.0',
            'environment': 'production' if not settings.DEBUG else 'development',
            'checks': {}
        }
        
        # Database health check
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
            health_status['checks']['database'] = {
                'status': 'healthy',
                'message': 'Database connection successful'
            }
        except Exception as e:
            health_status['status'] = 'unhealthy'
            health_status['checks']['database'] = {
                'status': 'unhealthy',
                'message': f'Database connection failed: {str(e)}'
            }
        
        # Cache health check
        try:
            cache_key = 'health_check_test'
            cache.set(cache_key, 'test_value', 30)
            cached_value = cache.get(cache_key)
            if cached_value == 'test_value':
                health_status['checks']['cache'] = {
                    'status': 'healthy',
                    'message': 'Cache system operational'
                }
            else:
                raise Exception('Cache value mismatch')
        except Exception as e:
            health_status['checks']['cache'] = {
                'status': 'warning',
                'message': f'Cache system issue: {str(e)}'
            }
        
        # Response time
        response_time = round((time.time() - start_time) * 1000, 2)
        health_status['response_time_ms'] = response_time
        
        # Overall status
        if any(check['status'] == 'unhealthy' for check in health_status['checks'].values()):
            health_status['status'] = 'unhealthy'
            status_code = 503
        elif any(check['status'] == 'warning' for check in health_status['checks'].values()):
            health_status['status'] = 'warning'
            status_code = 200
        else:
            status_code = 200
        
        return JsonResponse(health_status, status=status_code)


class ReadinessCheckView(View):
    """
    Readiness check endpoint for load balancer
    """
    
    def get(self, request):
        """
        Return readiness status of the application
        """
        try:
            # Check if we can connect to database
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) FROM django_migrations")
                cursor.fetchone()
            
            return JsonResponse({
                'status': 'ready',
                'timestamp': int(time.time())
            })
        except Exception as e:
            return JsonResponse({
                'status': 'not_ready',
                'error': str(e),
                'timestamp': int(time.time())
            }, status=503)


class LivenessCheckView(View):
    """
    Liveness check endpoint for container orchestration
    """
    
    def get(self, request):
        """
        Return liveness status of the application
        """
        return JsonResponse({
            'status': 'alive',
            'timestamp': int(time.time())
        })