from decimal import Decimal

from django.db.models import Sum
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Account, Category, Transaction
from .serializers import AccountSerializer, CategorySerializer, TransactionSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        transaction = serializer.save()

        if transaction.type == "income":
            transaction.account.balance += transaction.amount
        else:
            transaction.account.balance -= transaction.amount

        transaction.account.save(update_fields=["balance"])

    def perform_update(self, serializer):
        old_transaction = self.get_object()

        # Revertir el efecto del movimiento anterior
        if old_transaction.type == "income":
            old_transaction.account.balance -= old_transaction.amount
        else:
            old_transaction.account.balance += old_transaction.amount

        old_transaction.account.save(update_fields=["balance"])

        # Guardar los nuevos datos
        transaction = serializer.save()

        # Aplicar el nuevo movimiento
        if transaction.type == "income":
            transaction.account.balance += transaction.amount
        else:
            transaction.account.balance -= transaction.amount

        transaction.account.save(update_fields=["balance"])

    def perform_destroy(self, instance):
        # Revertir el efecto del movimiento antes de eliminarlo
        if instance.type == "income":
            instance.account.balance -= instance.amount
        else:
            instance.account.balance += instance.amount

        instance.account.save(update_fields=["balance"])

        instance.delete()


@api_view(["GET"])
def dashboard_summary(request):
    account_id = request.query_params.get("account")

    transactions = Transaction.objects.all()
    accounts = Account.objects.all()

    if account_id:
        transactions = transactions.filter(account_id=account_id)
        accounts = accounts.filter(id=account_id)

    income = transactions.filter(type="income").aggregate(
        total=Sum("amount")
    )["total"] or Decimal("0.00")

    expense = transactions.filter(type="expense").aggregate(
        total=Sum("amount")
    )["total"] or Decimal("0.00")

    balance = accounts.aggregate(
        total=Sum("balance")
    )["total"] or Decimal("0.00")

    return Response({
        "balance": balance,
        "income": income,
        "expense": expense,
    })