from django.contrib import admin
from django.urls import path
from controle.views import TransacaoCreateListView, TransacaoRetrieveUpdateDestroyView
from controle.views import ReceitaFinanceiraCreateListView, ReceitaFinanceiraRetrieveUpdateDestroyView
from controle.views import BancoCreateListView, BancoRetrieveUpdateDestroyView
from controle.views import CategoriaCreateListView, CategoriaRetrieveUpdateDestroyView

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
         name='detail-recept-view'),
    path('banco/',
         BancoCreateListView.as_view(),
         name='list-view-banks'),
    path('banco/<int:pk>/',
         BancoRetrieveUpdateDestroyView.as_view(),
         name='detail-banks-view'),
    path('categoria/',
         CategoriaCreateListView.as_view(),
         name='list-view-banks'),
    path('categoria/<int:pk>/',
         CategoriaRetrieveUpdateDestroyView.as_view(),
         name='detail-banks-view'),
]
