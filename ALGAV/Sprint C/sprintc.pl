node(a,45,95).
node(b,90,95).
node(c,15,85).
node(d,40,80).
node(e,70,80).
node(f,25,65).
node(g,65,65).
node(h,45,55).
node(i,5,50).
node(j,80,50).
node(l,65,45).
node(m,25,40).
node(n,55,30).
node(o,80,30).
node(p,25,15).
node(q,80,15).
node(r,55,10).

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
    best first caminho mais forte com máximo N ligações COMPLETO
 */


:-dynamic lista_bfsN/2.

bfsMaxN(Orig,Dest,Cam,Custo,N):-
    get_time(Ti),
    (bestFirstMaisForte(Orig,Dest,N);true),
    retract(lista_bfsN(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

bestFirstMaisForte(Orig,Dest,N):-
    asserta(lista_bfsN([],-9999)),
	bestfs1(Orig,Dest,Cam,Custo,N),
    atualiza_bf_maisForte(Cam,Custo),
    fail.

atualiza_bf_maisForte(Cam,Custo):-
    lista_bfsN(_,X),
    Custo>X,
    retract(lista_bfsN(_,_)),
    asserta(lista_bfsN(Cam,Custo)).

bestfs1(Orig,Dest,Cam,Custo,N):-
	bestfs12(Dest,[[Orig]],Cam,Custo,N). 

 bestfs12(Dest,[[Dest|T]|_],Cam,Custo,N):- 
	reverse([Dest|T],Cam),
    length(Cam,Length),
    (Length - 1) =< N,
	calcula_custo(Cam,Custo).

bestfs12(Dest,[[Dest|_]|LLA2],Cam,Custo,N):- 
	!,
	bestfs12(Dest,LLA2,Cam,Custo,N).
	
bestfs12(Dest,LLA,Cam,Custo,N):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12(Dest,[LA|LLA1],Cam,Custo,N))
	 ;
	 (
	  findall((CX,[X|LA]),(edge(_,Act,X,CX,_),
	  \+member(X,LA)),Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  bestfs12(Dest,LLA2,Cam,Custo,N)
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

/*
    dfs com max N ligações COMPLETO
*/

dfsmaxN(Orig,Dest,Cam,N):-
    dfsmaxN2(Orig,Dest,[Orig],Cam,N).

dfsmaxN2(Dest,Dest,LA,Cam,N):-
    !,
    length(LA,Length),
    (Length - 1) =< N,
    reverse(LA,Cam).
dfsmaxN2(Act,Dest,LA,Cam,N):-
    node(Act,_,_),
    (edge(_,Act,NAct,_,_);edge(_,NAct,Act,_,_)),
    node(NAct,_,_),
    \+ member(NAct,LA),
    dfsmaxN2(NAct,Dest,[NAct|LA],Cam,N).

/* */

:-dynamic melhor_dfs_N/2.

dfsMaxN(Orig,Dest,Cam,Custo,N):-
        get_time(Ti),
		(melhorDFS(Orig,Dest,N);true),
		retract(melhor_dfs_N(Cam,Custo)),
        get_time(Tf),
        T is Tf-Ti,
        write('Tempo de geracao da solucao: '),write(T),nl.

melhorDFS(Orig,Dest,N):-
		asserta(melhor_dfs_N(_,-9999)),
		dfsmaxN(Orig,Dest,LCaminho,N),
		atualiza_melhorDFS(LCaminho),
		fail.

atualiza_melhorDFS(LCaminho):-
		melhor_dfs_N(_,N),
		calculoDFSmaxN(LCaminho,C),
        C>N,retract(melhor_dfs_N(_,_)),
		asserta(melhor_dfs_N(LCaminho,C)).

calculoDFSmaxN([],0):-!.
calculoDFSmaxN([_],0):-!.
calculoDFSmaxN([X|[Y|Lc]],R):-
    calculoDFSmaxN([Y|Lc],R1),
    (edge(_,X,Y,A,_);edge(_,Y,X,A,_)),!,
    R is A + R1.

/* 
    rede max N ligacoes COMPLETA 
*/

redeMaxN(Origem,0,_):-!.
redeMaxN(Origem,N,Rede):-
    N1 is N - 1,
    amigos_proximos(Origem,L),
    append([Origem],L,LX),
    mais_amigos(LX,N1,Rede).

amigos_proximos(Origem,L):-
    findall(X,edge(_,Origem,X,_,_),L2),
    findall(X,edge(_,X,Origem,_,_),L3),
    append(L2,L3,L).

mais_amigos(L2,0,L2):-!.
mais_amigos(L,N,D):-
    amigos_dos_amigos(L,L2),
    union(L,L2,L1),
    N1 is N-1,
    mais_amigos(L1,N1,D),!.

amigos_dos_amigos([],[]):-!.
amigos_dos_amigos([H|T],LR):-
    amigos_proximos(H,L),
    amigos_dos_amigos(T,L2),
    union(L,L2,LR).


/*
    A * star COMPLETO
*/

:-dynamic melhor_astar/2.

melhor_aStar_maxN(Orig,Dest,Cam,Custo,N):-
    get_time(Ti),
    (melhorAStar(Orig,Dest,Cam,Custo,N);true),
	retract(melhor_astar(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

melhorAStar(Orig,Dest,Cam,Custo,N):-
		asserta(melhor_astar(_,-9999)),
		aStar(Orig,Dest,Cam,Custo,N),
		atualiza_melhor_aS(Cam,Custo),
		fail.

atualiza_melhor_aS(Cam,Custo):-
    melhor_astar(_,X),
    Custo>X,
    retract(melhor_astar(_,_)),
    asserta(melhor_astar(Cam,Custo)).

aStar(Orig,Dest,Cam,Custo,N):- aStar2(Dest,[(_,0,[Orig])],Cam,Custo,N).

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,N):-
    length([Dest|T],Length) ,
    (Length - 1) =< N ,
    reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,N):-
    LA=[Act|_],
    findall((CEX,CaX,[X|LA]),
    (Dest\==Act,edge(_,Act,X,CustoX,_),\+ member(X,LA),
    CaX is CustoX + Ca, estimativa(X,Dest,EstX),
    CEX is CaX +EstX),Novos),
    append(Outros,Novos,Todos),
    sort(Todos,TodosOrd),
    aStar2(Dest,TodosOrd,Cam,Custo,N).

estimativa(Nodo1,Nodo2,Estimativa):-
    node(Nodo1,X1,Y1),
    node(Nodo2,X2,Y2),
    Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).

/*
    função multicriterio COMPLETA
*/

multicriterio(Node1,Node2,R):-
    (edge(_,Node1,Node2,Lig,Rel);edge(_,Node2,Node1,Lig,Rel)),!,
    R is ( (0.75 * Lig) + (0.25 * Rel) ).

/*
    aStar multicriterio
*/

:-dynamic melhor_astar_multicriterio/2.

melhor_aStar_maxN_multicriterio(Orig,Dest,Cam,Custo,N):-
    get_time(Ti),
    (melhorAStar_multicriterio(Orig,Dest,Cam,Custo,N);true),
	retract(melhor_astar_multicriterio(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

melhorAStar_multicriterio(Orig,Dest,Cam,Custo,N):-
		asserta(melhor_astar_multicriterio(_,-9999)),
		aStar_multicriterio(Orig,Dest,Cam,Custo,N),
		atualiza_melhor_aS_multicriterio(Cam,Custo),
		fail.

atualiza_melhor_aS_multicriterio(Cam,Custo):-
    melhor_astar_multicriterio(_,X),
    Custo>X,
    retract(melhor_astar_multicriterio(_,_)),
    asserta(melhor_astar_multicriterio(Cam,Custo)).


aStar_multicriterio(Orig,Dest,Cam,Custo,N):- 
    aStar2_multicriterio(Dest,[(_,0,[Orig])],Cam,Custo,N).

aStar2_multicriterio(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,N):-
    length([Dest|T],Length) ,
    (Length - 1) =< N ,
    reverse([Dest|T],Cam).

aStar2_multicriterio(Dest,[(_,Ca,LA)|Outros],Cam,Custo,N):-
    LA=[Act|_],
    findall((CEX,CaX,[X|LA]),
    (Dest\==Act,edge(_,Act,X,_,_),\+ member(X,LA),
    multicriterio(Act,X,CustoX),
    CaX is CustoX + Ca, estimativa(X,Dest,EstX),
    CEX is CaX +EstX),Novos),
    append(Outros,Novos,Todos),
    sort(Todos,TodosOrd),
    aStar2_multicriterio(Dest,TodosOrd,Cam,Custo,N).

/*
    dfs multicriterio
*/

:-dynamic melhor_dfs_N_multicriterio/2.

dfsMaxN_multicriterio(Orig,Dest,Cam,Custo,N):-
    get_time(Ti),
    (melhorDFS_multicriterio(Orig,Dest,N);true),
    retract(melhor_dfs_N_multicriterio(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

melhorDFS_multicriterio(Orig,Dest,N):-
		asserta(melhor_dfs_N_multicriterio(_,-9999)),
		dfsmaxN(Orig,Dest,LCaminho,N),
		atualiza_melhorDFS_multicriterio(LCaminho),
		fail.

atualiza_melhorDFS_multicriterio(LCaminho):-
		melhor_dfs_N_multicriterio(_,N),
		calculoDFSmaxN_multicriterio(LCaminho,C),
        C>N,retract(melhor_dfs_N_multicriterio(_,_)),
		asserta(melhor_dfs_N_multicriterio(LCaminho,C)).

calculoDFSmaxN_multicriterio([],0):-!.
calculoDFSmaxN_multicriterio([_],0):-!.
calculoDFSmaxN_multicriterio([X|[Y|Lc]],R):-
    calculoDFSmaxN_multicriterio([Y|Lc],R1),
    multicriterio(X,Y,A),
    R is A + R1.

/*
    bfs multicriterio
*/

:-dynamic lista_bfsN_multicriterio/2.

bfsMaxN_multicriterio(Orig,Dest,Cam,Custo,N):-
    get_time(Ti),
    (bestFirstMaisForte_multicriterio(Orig,Dest,N);true),
    retract(lista_bfsN_multicriterio(Cam,Custo)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '),write(T),nl.

bestFirstMaisForte_multicriterio(Orig,Dest,N):-
    asserta(lista_bfsN_multicriterio([],-9999)),
	bestfs1_multicriterio(Orig,Dest,Cam,Custo,N),
    atualiza_bf_maisForte_multicriterio(Cam,Custo),
    fail.

atualiza_bf_maisForte_multicriterio(Cam,Custo):-
    lista_bfsN_multicriterio(_,X),
    Custo>X,
    retract(lista_bfsN_multicriterio(_,_)),
    asserta(lista_bfsN_multicriterio(Cam,Custo)).

bestfs1_multicriterio(Orig,Dest,Cam,Custo,N):-
	bestfs12_multicriterio(Dest,[[Orig]],Cam,Custo,N). 

bestfs12_multicriterio(Dest,[[Dest|T]|_],Cam,Custo,N):- 
	reverse([Dest|T],Cam),
    length(Cam,Length),
    (Length - 1) =< N,
	calcula_custo_multicriterio(Cam,Custo).

bestfs12_multicriterio(Dest,[[Dest|_]|LLA2],Cam,Custo,N):- 
	!,
	bestfs12_multicriterio(Dest,LLA2,Cam,Custo,N).

bestfs12_multicriterio(Dest,LLA,Cam,Custo,N):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12_multicriterio(Dest,[LA|LLA1],Cam,Custo,N))
	 ;
	 (
	  findall((CX,[X|LA]),(edge(_,Act,X,CX,_),
	  \+member(X,LA)),Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  bestfs12_multicriterio(Dest,LLA2,Cam,Custo,N)
	 )).

calcula_custo_multicriterio([Act,X],C):-!,multicriterio(Act,X,C).
calcula_custo_multicriterio([Act,X|L],S):-
    calcula_custo_multicriterio([X|L],S1), 
    multicriterio(Act,X,C),
    S is S1+C.
