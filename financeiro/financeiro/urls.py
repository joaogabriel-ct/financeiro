from django.contrib import admin
from django.urls import path
from controle.views import TransacaoCreateListView, TransacaoRetrieveUpdateDestroyView
from controle.views import ReceitaFinanceiraCreateListView, ReceitaFinanceiraRetrieveUpdateDestroyView

urlpatterns = [
    path('admin/',
         admin.site.urls),
    path('gastos/',
         TransacaoCreateListView.as_view(),
         name='list-view'),
    path('gastos/<int:pk>/',
         TransacaoRetrieveUpdateDestroyView.as_view(),
         name='detail-list-view'),
    path('receitas/',
         ReceitaFinanceiraCreateListView.as_view(),
         name='list-view-recepts'),
    path('receitas/<int:pk>/',
         ReceitaFinanceiraRetrieveUpdateDestroyView.as_view(),
         name='detail-recept-view')
]
