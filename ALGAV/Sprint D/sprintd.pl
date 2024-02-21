% id, x, y, estado emocional indice, valor 0-1, tags

node(a,45,95,4,0.3,[natureza,pintura,musica,sw,porto,teste]).
node(b,90,95,1,0.3,[natureza,pintura,carros,futebol,lisboa,teste]).
node(c,15,85,1,0.3,[natureza,musica,carros,porto,moda,teste]).
node(d,40,80,1,0.3,[natureza,musica,sw,futebol,coimbra]).
node(e,70,80,1,0.3,[natureza,cinema,jogos,sw,moda]).
node(f,25,65,1,0.3,[natureza,cinema,teatro,carros,coimbra]).
node(g,65,65,1,0.3,[natureza,musica,porto,lisboa,cinema]).
node(h,45,55,1,0.3,[natureza,pintura,sw,musica,carros,lisboa]).
node(i,5,50,1,0.3,[natureza,cinema,jogos,moda,porto]).
node(j,80,50,1,0.3,[natureza,pintura,musica,moda,porto]).
node(l,65,45,1,0.3,[natureza,cinema,musica,tecnologia,porto]).
node(m,25,40,1,0.3,[natureza,carros,futebol,coimbra]).
node(n,55,30,1,0.3,[natureza,musica,cinema,lisboa,moda]).
node(o,80,30,1,0.3,[natureza,teatro,tecnologia,futebol,porto]).
node(p,25,15,1,0.3,[natureza,futebol,sw,jogos,porto]).
node(q,80,15,1,0.3,[natureza,teatro,carros,porto]).
node(r,55,10,1,0.3,[natureza,moda,tecnologia,cinema]).

% 1º ligação 2º relação

edge(1,a,b,45,45).
edge(2,a,c,32,32).
edge(3,a,d,16,16).
edge(4,a,e,30,30).
edge(5,b,e,25,16).
edge(6,d,e,30,16).
edge(7,c,d,26,16).
edge(8,c,f,23,16).
edge(9,c,i,37,16).
edge(10,d,f,22,16).
edge(11,f,h,23,16).
edge(12,f,m,25,16).
edge(13,f,i,25,16).
edge(14,i,m,23,16).
edge(15,e,f,48,16).
edge(16,e,g,16,16).
edge(17,e,j,32,16).
edge(18,g,h,23,16).
edge(19,g,l,20,16).
edge(20,g,j,22,16).
edge(21,h,m,25,16).
edge(22,h,n,27,16).
edge(23,h,l,23,16).
edge(24,j,l,16,16).
edge(25,j,o,20,16).
edge(26,l,n,19,16).
edge(27,l,o,22,16).
edge(28,m,n,32,16).
edge(29,m,p,25,16).
edge(30,n,p,34,16).
edge(31,n,r,20,16).
edge(32,o,n,25,16).
edge(33,o,q,15,16).
edge(34,p,r,31,16).

/*
    multicriterio
*/

multicriterio(Node1,Node2,R):-
    (edge(_,Node1,Node2,Lig,Rel);edge(_,Node2,Node1,Lig,Rel)),!,
    R is ( (0.75 * Lig) + (0.25 * Rel) ).

/*
    dfs estados emocionais

*/

dfsmaxNemocional(Orig,Dest,Cam,N,Estados,LimiteEmocional):-
    dfsmaxNemocional2(Orig,Dest,[Orig],Cam,N,Estados,LimiteEmocional).

dfsmaxNemocional2(Dest,Dest,LA,Cam,N,Estados,LimiteEmocional):-
    !,
    length(LA,Length),
    (Length - 1) =< N,
    reverse(LA,Cam).
dfsmaxNemocional2(Act,Dest,LA,Cam,N,Estados,LimiteEmocional):-
    node(Act,_,_,_,_,_),
    (edge(_,Act,NAct,_,_);edge(_,NAct,Act,_,_)),
    node(NAct,_,_,E,V,_),
    \+ member(NAct,LA),
    checkEmo(E,V,Estados,LimiteEmocional),
    dfsmaxNemocional2(NAct,Dest,[NAct|LA],Cam,N,Estados,LimiteEmocional).

/* checkEmoLista([],Estados,LimiteEmocional).
checkEmoLista([X|Cam],Estados,LimiteEmocional):-
    node(X,_,_,E,V),
    checkEmo(E,V,Estados,LimiteEmocional),
    checkEmoLista(Cam,Estados,LimiteEmocional). */

checkEmo(E,V,Estados,LimiteEmocional):-
    \+ member(E,Estados),
    V < LimiteEmocional.

/* */

:-dynamic dfs_path/2.

plan_dfs_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
        get_time(Ti),
		(melhorDFSemocional(Orig,Dest,N,Estados,LimiteEmocional);true),
		retract(dfs_path(Cam,Custo)),
        get_time(Tf),
        T is Tf-Ti,
        write('Tempo de geracao da solucao: '),write(T),nl.

melhorDFSemocional(Orig,Dest,N,Estados,LimiteEmocional):-
		asserta(dfs_path([],-9999)),
		dfsmaxNemocional(Orig,Dest,LCaminho,N,Estados,LimiteEmocional),
		atualiza_melhorDFS(LCaminho),
		fail.

atualiza_melhorDFS(LCaminho):-
		dfs_path(_,N),
		calculoDFSmaxN(LCaminho,C),
        C>N,retract(dfs_path(_,_)),
		asserta(dfs_path(LCaminho,C)).

calculoDFSmaxN([],0):-!.
calculoDFSmaxN([_],0):-!.
calculoDFSmaxN([X|[Y|Lc]],R):-
    calculoDFSmaxN([Y|Lc],R1),
    (edge(_,X,Y,A,_);edge(_,Y,X,A,_)),!,
    R is A + R1.

/*
    dfs multicriterio emocional
*/

:-dynamic emo_dfs_multicriterio/2.

plan_dfs_multi_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
    get_time(Ti),
    (melhorDFS_multicriterio_emo(Orig,Dest,N,Estados,LimiteEmocional);true),
    retract(emo_dfs_multicriterio(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

melhorDFS_multicriterio_emo(Orig,Dest,N,Estados,LimiteEmocional):-
		asserta(emo_dfs_multicriterio(_,-9999)),
		dfsmaxNemocional(Orig,Dest,LCaminho,N,Estados,LimiteEmocional),
		atualiza_melhorDFS_multicriterio_emo(LCaminho),
		fail.

atualiza_melhorDFS_multicriterio_emo(LCaminho):-
		emo_dfs_multicriterio(_,N),
		calculoDFSmaxN_multicriterio(LCaminho,C),
        C>N,retract(emo_dfs_multicriterio(_,_)),
		asserta(emo_dfs_multicriterio(LCaminho,C)).

calculoDFSmaxN_multicriterio([],0):-!.
calculoDFSmaxN_multicriterio([_],0):-!.
calculoDFSmaxN_multicriterio([X|[Y|Lc]],R):-
    calculoDFSmaxN_multicriterio([Y|Lc],R1),
    multicriterio(X,Y,A),
    R is A + R1.

/*
    best first emocional
*/

:-dynamic emo_bfs/2.

plan_bfs_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
    get_time(Ti),
    (bestfirst_mais_emo(Orig,Dest,N,Estados,LimiteEmocional);true),
    retract(emo_bfs(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

bestfirst_mais_emo(Orig,Dest,N,Estados,LimiteEmocional):-
    asserta(emo_bfs([],-9999)),
	bestfs1_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional),
    atualiza_bf_maisForte_emo(Cam,Custo),
    fail.

atualiza_bf_maisForte_emo(Cam,Custo):-
    emo_bfs(_,X),
    Custo>X,
    retract(emo_bfs(_,_)),
    asserta(emo_bfs(Cam,Custo)).

bestfs1_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
	bestfs12_emo(Dest,[[Orig]],Cam,Custo,N,Estados,LimiteEmocional). 

 bestfs12_emo(Dest,[[Dest|T]|_],Cam,Custo,N,Estados,LimiteEmocional):- 
	reverse([Dest|T],Cam),
    length(Cam,Length),
    (Length - 1) =< N,
	calcula_custo(Cam,Custo).

bestfs12_emo(Dest,[[Dest|_]|LLA2],Cam,Custo,N,Estados,LimiteEmocional):- 
	!,
	bestfs12_emo(Dest,LLA2,Cam,Custo,N,Estados,LimiteEmocional).
	
bestfs12_emo(Dest,LLA,Cam,Custo,N,Estados,LimiteEmocional):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12_emo(Dest,[LA|LLA1],Cam,Custo,N,Estados,LimiteEmocional))
	 ;
	 (
	  findall((CX,[X|LA]),(edge(_,Act,X,CX,_),
	  \+member(X,LA)),Novos),
      node(Act,_,_,E,V,_),
      checkEmo(E,V,Estados,LimiteEmocional),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  bestfs12_emo(Dest,LLA2,Cam,Custo,N,Estados,LimiteEmocional)
	 )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo([Act,X],C):-!,edge(_,Act,X,C,_).
calcula_custo([Act,X|L],S):-
    calcula_custo([X|L],S1), 
	edge(_,Act,X,C,_),
    S is S1+C.

/* bfs multicriterio emocional */

:-dynamic bfs_emo_multicriterio/2.

plan_bfs_emo_multicriterio(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
    get_time(Ti),
    (bestFirstMaisForte_multicriterio_emo(Orig,Dest,N,Estados,LimiteEmocional);true),
    retract(bfs_emo_multicriterio(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

bestFirstMaisForte_multicriterio_emo(Orig,Dest,N,Estados,LimiteEmocional):-
    asserta(bfs_emo_multicriterio([],-9999)),
	bestfs1_multicriterio_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional),
    atualiza_bf_maisForte_multicriterio_emo(Cam,Custo),
    fail.

atualiza_bf_maisForte_multicriterio_emo(Cam,Custo):-
    bfs_emo_multicriterio(_,X),
    Custo>X,
    retract(bfs_emo_multicriterio(_,_)),
    asserta(bfs_emo_multicriterio(Cam,Custo)).

bestfs1_multicriterio_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
	bestfs12_multicriterio_emo(Dest,[[Orig]],Cam,Custo,N,Estados,LimiteEmocional). 

bestfs12_multicriterio_emo(Dest,[[Dest|T]|_],Cam,Custo,N,Estados,LimiteEmocional):- 
	reverse([Dest|T],Cam),
    length(Cam,Length),
    (Length - 1) =< N,
	calcula_custo_multicriterio(Cam,Custo).

bestfs12_multicriterio_emo(Dest,[[Dest|_]|LLA2],Cam,Custo,N,Estados,LimiteEmocional):- 
	!,
	bestfs12_multicriterio_emo(Dest,LLA2,Cam,Custo,N,Estados,LimiteEmocional).

bestfs12_multicriterio_emo(Dest,LLA,Cam,Custo,N,Estados,LimiteEmocional):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12_multicriterio_emo(Dest,[LA|LLA1],Cam,Custo,N,Estados,LimiteEmocional))
	 ;
	 (
	  findall((CX,[X|LA]),(edge(_,Act,X,CX,_),
	  \+member(X,LA)),Novos),
      node(Act,_,_,E,V,_),
      checkEmo(E,V,Estados,LimiteEmocional),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  bestfs12_multicriterio_emo(Dest,LLA2,Cam,Custo,N,Estados,LimiteEmocional)
	 )).

calcula_custo_multicriterio([Act,X],C):-!,multicriterio(Act,X,C).
calcula_custo_multicriterio([Act,X|L],S):-
    calcula_custo_multicriterio([X|L],S1), 
    multicriterio(Act,X,C),
    S is S1+C.

/* a* multicriterio emocional */

:-dynamic astar_emo/2.

plan_astar_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
    get_time(Ti),
    (melhorAStar_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional);true),
	retract(astar_emo(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

melhorAStar_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
		asserta(astar_emo(_,-9999)),
		aStar_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional),
		atualiza_melhor_aS_emo(Cam,Custo),
		fail.

atualiza_melhor_aS_emo(Cam,Custo):-
    astar_emo(_,X),
    Custo>X,
    retract(astar_emo(_,_)),
    asserta(astar_emo(Cam,Custo)).

aStar_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):- aStar2_emo(Dest,[(_,0,[Orig])],Cam,Custo,N,Estados,LimiteEmocional).

aStar2_emo(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,N,Estados,LimiteEmocional):-
    length([Dest|T],Length) ,
    (Length - 1) =< N ,
    reverse([Dest|T],Cam).

aStar2_emo(Dest,[(_,Ca,LA)|Outros],Cam,Custo,N,Estados,LimiteEmocional):-
    LA=[Act|_],
    findall((CEX,CaX,[X|LA]),
    (Dest\==Act,edge(_,Act,X,CustoX,_),\+ member(X,LA),
    node(X,_,_,E,V,_),
    checkEmo(E,V,Estados,LimiteEmocional),
    CaX is CustoX + Ca, estimativa(X,Dest,EstX),
    CEX is CaX +EstX),Novos),
    append(Outros,Novos,Todos),
    sort(Todos,TodosOrd),
    aStar2_emo(Dest,TodosOrd,Cam,Custo,N,Estados,LimiteEmocional).

estimativa(Nodo1,Nodo2,Estimativa):-
    node(Nodo1,X1,Y1,_,_,_),
    node(Nodo2,X2,Y2,_,_,_),
    Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).

/* astar multicriterio emo */

:-dynamic astar_emo_multicriterio/2.

plan_astar_emo_multicriterio(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
    get_time(Ti),
    (melhorAStar_multicriterio_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional);true),
	retract(astar_emo_multicriterio(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

melhorAStar_multicriterio_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):-
		asserta(astar_emo_multicriterio(_,-9999)),
		aStar_multicriterio_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional),
		atualiza_melhor_aS_multicriterio_emo(Cam,Custo),
		fail.

atualiza_melhor_aS_multicriterio_emo(Cam,Custo):-
    astar_emo_multicriterio(_,X),
    Custo>X,
    retract(astar_emo_multicriterio(_,_)),
    asserta(astar_emo_multicriterio(Cam,Custo)).


aStar_multicriterio_emo(Orig,Dest,Cam,Custo,N,Estados,LimiteEmocional):- 
    aStar2_multicriterio_emo(Dest,[(_,0,[Orig])],Cam,Custo,N,Estados,LimiteEmocional).

aStar2_multicriterio_emo(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,N,Estados,LimiteEmocional):-
    length([Dest|T],Length) ,
    (Length - 1) =< N ,
    reverse([Dest|T],Cam).

aStar2_multicriterio_emo(Dest,[(_,Ca,LA)|Outros],Cam,Custo,N,Estados,LimiteEmocional):-
    LA=[Act|_],
    findall((CEX,CaX,[X|LA]),
    (Dest\==Act,edge(_,Act,X,_,_),\+ member(X,LA),
    node(X,_,_,E,V,_),
    checkEmo(E,V,Estados,LimiteEmocional),
    multicriterio(Act,X,CustoX),
    CaX is CustoX + Ca, estimativa(X,Dest,EstX),
    CEX is CaX +EstX),Novos),
    append(Outros,Novos,Todos),
    sort(Todos,TodosOrd),
    aStar2_multicriterio_emo(Dest,TodosOrd,Cam,Custo,N,Estados,LimiteEmocional).


/* maior grupo com n users e t tags*/


plan_grupo(Orig,Grupo,N,T,Obrigatorias):-
    node(Orig,_,_,_,_,ListaTags),
    xtags_comum(T,ListaTags,Users),
    filtrar_grupos(Users,LUsers,N,Obrigatorias),
    maior_grupo(LUsers,Grupo).

filtrar_grupos([],[],_,Obrigatorias):-!.
filtrar_grupos([X|Grupos],[X|Novos],N,Obrigatorias):-
    length(X,Length),
    (Length - 1) >= N,
    tem_obrigatorias(X,Obrigatorias),
    filtrar_grupos(Grupos,Novos,N,Obrigatorias),!.
filtrar_grupos([X|Grupos],Novos,N,Obrigatorias):-filtrar_grupos(Grupos,Novos,N,Obrigatorias).

tem_obrigatorias([],_).
tem_obrigatorias([X|Users],Obrigatorias):-
    node(X,_,_,_,_,ListaTags),
    tem_obrigatorias1(Obrigatorias, ListaTags),
    tem_obrigatorias(Users,Obrigatorias).
    
tem_obrigatorias1(Obrigatorias, ListaTags):-
    forall(member(Element,Obrigatorias), member(Element,ListaTags)).


maior_grupo([L],L) :-
   !.
maior_grupo([H|T],H) :- 
   length(H,N1),
   maior_grupo(T,X),
   length(X, M),
   N1 > M,
   !.
maior_grupo([H|T],X) :-
   maior_grupo(T,X),
   !.

xtags_comum(X,LTags,LUtz):-
    todas_combinacoes(X,LTags,LcombXTags),
    todos_utilizadores(LcombXTags,LUtz).

todos_utilizadores([],[]).
todos_utilizadores([Tags|LcombXTags],[Utz|LUtz]):-
    utilizador_xcomum(Tags,Utz),
    todos_utilizadores(LcombXTags,LUtz).

utilizador_xcomum(LTags,LUtz):-findall(Id,(node(Id,_,_,_,_,L),allMember(LTags,L)),LUtz).

todas_combinacoes(X,LTags,LcombXTags):-findall(L,combinacao(X,LTags,L),LcombXTags).

combinacao(0,_,[]):-!.
combinacao(X,[Tag|L],[Tag|T]):-X1 is X-1, combinacao(X1,L,T).
combinacao(X,[_|L],T):- combinacao(X,L,T).

allMember([],_):-!.
allMember([H|T],L):- member(H,L),allMember(T,L).

/* alteração estados emocionais */

/* 1-alegria 2-angustia 3-esperança 4-medo 5-alivio 6-decepcao */

alterar_emo(Orig,Cam,Quer,NaoQuer,NewVal):-
    node(Orig,_,_,E,V,_),
    write("Valor original: "), write(V),nl,
    length(Cam,Length),
    Max1 is (Length - 1),
    Max is Max1 * 200,
    calculo_indices(Cam,Val),
    (E == 1,calculo_estado_alegria(V,Val,Max,NewVal),!;
    E == 2, calculo_estado_angustia(V,Val,Max,NewVal),!;
    (E == 3;E == 5),calculo_estado_esperanca_alivio(V,Cam,Quer,NewVal),!;
    (E == 4;E == 6),calculo_estado_medo_decepcao(V,Cam,NaoQuer,NewVal),!).

calculo_indices([],0):-!.
calculo_indices([_],0):-!.
calculo_indices([X|[Y|Lc]],Val):-
    calculo_indices([Y|Lc],Val1),
    (edge(_,X,Y,_,A);edge(_,Y,X,_,A)),!,
    Val is A + Val1.

calculo_estado_alegria(V,Val,Max,NewVal):-
    NewVal is (V + (1-V) * (Val/Max)).

calculo_estado_angustia(V,Val,Max,NewVal):-
    NewVal is (V * (1 - (Val/Max))).

calculo_estado_esperanca_alivio(V,Cam,Quer,NewVal):-
    length(Quer,Max),
    intersection(Cam,Quer,Result),
    length(Result,Min),
    Quociente is (Min/Max),
    NewVal is (V + (1-V) * Quociente).

calculo_estado_medo_decepcao(V,Cam,NaoQuer,NewVal):-
    length(NaoQuer,Max),
    intersection(Cam,NaoQuer,Result),
    length(Result,Min),
    Quociente is (Min/Max),
    NewVal is (V * (1 - Quociente)).



