from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AccountViewSet,
    CategoryViewSet,
    TransactionViewSet,
    dashboard_summary,
)


router = DefaultRouter()

router.register(r"accounts", AccountViewSet)
router.register(r"categories", CategoryViewSet)
router.register(r"transactions", TransactionViewSet)


urlpatterns = [
    path("dashboard/", dashboard_summary, name="dashboard-summary"),
    path("", include(router.urls)),
]