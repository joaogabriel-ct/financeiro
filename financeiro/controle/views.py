from rest_framework import generics
from .models import Transacao, ReceitaFinanceira
from .serializers import TransacaoSerializer, ReceitaFinanceiraSerializer
from rest_framework.response import Response
from rest_framework import status


class TransacaoCreateListView(generics.ListCreateAPIView):
    queryset = Transacao.objects.all()
    serializer_class = TransacaoSerializer

    def list(self, request, *args, **kwargs):
        transacoes_queryset = self.get_queryset()
        transacoes_serializer = self.get_serializer(transacoes_queryset, many=True)
        
        data = {'transacoes': transacoes_serializer.data}
        
        for transacao_data in data['transacoes']:
            transacao_id = transacao_data['id']
            transacao_obj = Transacao.objects.get(id=transacao_id)
            transacao_data['banco'] = transacao_obj.banco.nome
            transacao_data['categoria'] = transacao_obj.categoria.nome
        
        receitas_queryset = ReceitaFinanceira.objects.all()
        receitas_serializer = ReceitaFinanceiraSerializer(receitas_queryset, many=True)
        
        data['receitas'] = receitas_serializer.data

        return Response(data)

class TransacaoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transacao.objects.all()
    serializer_class = TransacaoSerializer


class ReceitaFinanceiraCreateListView(generics.ListCreateAPIView):
    queryset = ReceitaFinanceira.objects.all()
    serializer_class = ReceitaFinanceiraSerializer


class ReceitaFinanceiraRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ReceitaFinanceira.objects.all()
    serializer_class = ReceitaFinanceiraSerializer
