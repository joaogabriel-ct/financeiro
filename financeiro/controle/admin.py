from django.contrib import admin
from .models import Transacao, Categoria, Banco, ReceitaFinanceira


class TransacaoAdmin(admin.ModelAdmin):
    list_display = ('categoria', 'descricao', 'valor', 'data',
                    'banco', 'parcelas', 'parcela_atual')


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')


class BancoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')


class ReceitaFinanceiraAdmin(admin.ModelAdmin):
    list_display = ('id', 'descricao', 'valor', 'data')


admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Banco, BancoAdmin)
admin.site.register(Transacao, TransacaoAdmin)
admin.site.register(ReceitaFinanceira, ReceitaFinanceiraAdmin)
