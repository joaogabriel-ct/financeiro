from rest_framework import serializers
from .models import Transacao, Categoria, Banco, ReceitaFinanceira, Parcela



class TransacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacao
        fields = ['id', 'categoria', 'descricao', 'valor', 'data',
                  'banco', 'parcelas', 'parcela_atual']


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome']


class BancoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banco
        fields = ['id', 'nome']


class ReceitaFinanceiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceitaFinanceira
        fields = ['id', 'descricao', 'valor', 'data']


class ParcelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcela
        fields = ['id', 'transacao', 'numero', 'valor', 'data_vencimento']