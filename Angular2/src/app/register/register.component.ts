import { Component, OnInit } from '@angular/core';

import {Jogador} from "../jogador";
import {Observable} from "rxjs";
import {JogadorService} from "../jogador.service";
import {element} from "protractor";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  termos= false;
  data=new Date();
  jogador=new Jogador("","","","","","","","",new Date().toDateString(),"","","","",this.data.getDay()+1+"/"+this.data.getMonth()+1+"/"+this.data.getFullYear());

   private jogadores: Jogador [];


  constructor(public service:JogadorService) {
    this.jogadores= [];
  }

  ngOnInit(): void {
  }
  addJogador(){
    if(this.termos){
    this.service.addJogador(this.jogador).subscribe(jogador=>this.jogadores.push(jogador));
    alert("Jogador Criado")
    }else {
      alert("Tem de aceitar os termos e condições")
    }
  }

  addCode() {
    // @ts-ignore
    document.getElementById("termos").innerHTML+="" +
      "<div style=\"background: white;width: 900px;height: 1700px; margin-top: 50px; padding: 30px;\">" +
      "<h1>Política de Privacidade</h1>\n" +
      "    <h2>De acordo com o artigo 13.º do Regulamento Europeu de Proteção de Dados Pessoais Reg. UE 2016/679 e a respetiva Retificação de outubro de 2020</h2>                    \n" +
      "        <p>A Graphs4Social reconhece a importância da proteção dos dados pessoais dos utilizadores. </p>  \n" +
      "        <p>Nesta Política de Privacidade, poderá encontrar todas as informações necessárias para melhor compreender como tratamos os seus dados pessoais.</p>                    \n" +
      "            \n" +
      "        <h3>Responsável pelo tratamento</h3> \n" +
      "            <p>A Graphs4Social, S.A., com sede na Avenida dos Aliados, 4000-064 Santo Ildefonso, Porto, com o NIF 521478963 é a Responsável pelo Tratamento dos dados recolhidos neste website.</p>\n" +
      "\n" +
      "        <h3>Informações Recolhidas</h3> \n" +
      "            <h4>Informações e Conteúdos fornecidos</h4>\n" +
      "                <p>Recolhemos os conteúdos, comunicações e outras informações que fornece quando utiliza o nosso produto, incluindo quando se regista numa conta, cria ou partilha conteúdo com outras pessoas. Isto pode incluir informações presentes nos ou sobre os conteúdos que forneceu, como a data em que um post foi criado. </p>\n" +
      "            <h4>Redes e ligações</h4>\n" +
      "                <p>Recolhemos informações sobre as pessoas, contas e tags com os quais tem ligações e sobre a forma como interage com os mesmos na Rede Social. </p>\n" +
      "            <h4>Interação com outros utilizadores</h4>\n" +
      "                <p>Também recebemos e analisamos conteúdos e informações que as outras pessoas fornecem quando utilizam a Rede Social. Isto pode incluir informações sobre si, como quando outras pessoas comentam um post seu.</p>\n" +
      "        \n" +
      "        <h3>Direito ao esquecimento</h3>\n" +
      "            <p>Armazenamos dados até a sua conta ser eliminada. Quando elimina a sua conta, eliminamos os conteúdos que publicou não vai conseguir recuperar essas informações mais tarde. As informações que as outras pessoas partilharam sobre si não fazem parte da sua conta e não vão ser eliminadas. </p>\n" +
      "\n" +
      "        <h3>Direitos dos Titulares dos Dados</h3>\n" +
      "            <p>Poderá exercer os seguintes direitos, conforme previstos pelo RGPD, através do email protecaodados@graphs4social.pt:</p>\n" +
      "            <ul>\n" +
      "                <li>Direito de acesso à sua informação pessoal;</li>\n" +
      "                <li>Direito de retificação dos seus dados;</li>\n" +
      "                <li>Direito ao Apagamento dos dados;</li>\n" +
      "                <li>Direito à limitação do tratamento;</li>\n" +
      "                <li>Direito de oposição;</li>\n" +
      "                <li>Direito de apresentação de uma reclamação / queixa junto da <a href=https://www.cnpd.pt>CNPD</a>– Comissão Nacional de Proteção de Dados; Neste caso, solicitamos o especial favor de nos contactar previamente à apresentação da reclamação junto da CNPD tendo em vista a resolução rápida do problema reportado.</li>\n" +
      "            </ul>\n" +
      "            <p>Sempre que os seus dados sejam processados com base no consentimento poderá retirar o seu consentimento em qualquer altura, sem que isso comprometa a licitude do tratamento efetuado com base no consentimento previamente dado.</p>\n" +
      "        <h3>Outros Termos</h3>\n" +
      "            <p>A Graphs4Social conservará os seus dados enquanto se mantiver como utilizador registado no nosso site.  Isto, sem prejuízo do exercício do seu direito de oposição quando aplicável.</p>\n" +
      "            <p>Para que os dados sejam tratados de forma adequada, a Graphs4Social possibilitará o acesso aos seus dados pessoais por parte das seguintes entidades:</p>\n" +
      "            <ul>\n" +
      "                <li>Terceiros que levam a cabo parte da atividade de tratamento de dados, em nome e sob a responsabilidade da Graphs4Social, com base num contrato de subcontratação (subcontratantes) celebrado nos termos do artigo 28.º do RGPD; ou que exerçam as atividades de tratamento de dados em corresponsabilidade com a Graphs4Social (quando aplicável e em função de informação prestada no caso concreto);</li>\n" +
      "                <li>Pessoas individuais, trabalhadores e / ou colaboradores que tenham sido designados para desempenhar uma ou mais atividades de tratamento dos seus dados na qualidade de “Pessoas Autorizadas” tal como previsto no artigo 29.º do RGPD;</li>\n" +
      "                <li>Os seus dados pessoais poderão ser comunicados a entidades públicas ou autoridades judiciais, se assim for obrigatório por lei ou para prevenir ou punir a prática de crimes. </li>\n" +
      "                <li>De acordo com o disposto no artigo 4.º/9 do RGPD, “as autoridades públicas que possam receber dados pessoais no âmbito de inquéritos específicos nos termos do direito da União ou dos Estados-Membros não são consideradas destinatários”.</li>\n" +
      "            </ul>\n" +
      "        <h3>Encarregado de Proteção de Dados</h3>\n" +
      "            <p>A Graphs4Social, S.A. nomeou um Encarregado de Proteção de Dados que poderá ser contactado através do email protecaodados@graphs4social.pt.</p>\n" +
      "\n" +
      "<p>Esta política é efetiva a partir de <strong>novembro</strong> de <strong>2021</strong>.</p>\n" +
      "        \n" +
      "            " +
      "</div>"
  }

  disableSubmit() {
    // document.getElementById("submitRegister").
  }

  activateButton() {
    var element = <HTMLInputElement> document.getElementById("terms");
    var isChecked = element.checked;
    if(isChecked){
      this.termos=true;
    }else {
      this.termos=false;
    }


  }
}
