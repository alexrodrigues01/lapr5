no(1,ana,[natureza,pintura,musica,sw,porto]).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
no(13,carlos,[natureza,musica,sw,futebol,coimbra]).
no(14,daniel,[natureza,cinema,jogos,sw,moda]).
no(21,eduardo,[natureza,cinema,teatro,carros,coimbra]).
no(22,isabel,[natureza,musica,porto,lisboa,cinema]).
no(23,jose,[natureza,pintura,sw,musica,carros,lisboa]).
no(24,luisa,[natureza,cinema,jogos,moda,porto]).
no(31,maria,[natureza,pintura,musica,moda,porto]).
no(32,anabela,[natureza,cinema,musica,tecnologia,porto]).
no(33,andre,[natureza,carros,futebol,coimbra]).
no(34,catia,[natureza,musica,cinema,lisboa,moda]).
no(41,cesar,[natureza,teatro,tecnologia,futebol,porto]).
no(42,diogo,[natureza,futebol,sw,jogos,porto]).
no(43,ernesto,[natureza,teatro,carros,porto]).
no(44,isaura,[natureza,moda,tecnologia,cinema]).
no(200,sara,[natureza,moda,musica,sw,coimbra]).

no(51,rodolfo,[natureza,musica,sw]).
no(61,rita,[moda,tecnologia,cinema]).

% ligacao(11,22,2,0).


ligacao(1,11,10,8).
ligacao(1,12,2,6).
ligacao(1,13,-3,-2).
ligacao(1,14,1,-5).

ligacao(11,12,0,-2).

ligacao(11,21,5,7).
ligacao(11,22,2,-4).
ligacao(11,23,-2,8).
ligacao(11,24,6,0).
ligacao(12,21,4,9).
ligacao(12,22,-3,-8).
ligacao(12,23,2,4).
ligacao(12,24,-2,4).
ligacao(13,21,3,2).
ligacao(13,22,0,-3).
ligacao(13,23,5,9).
ligacao(13,24,-2, 4).
ligacao(14,21,2,6).
ligacao(14,22,6,-3).
ligacao(14,23,7,0).
ligacao(14,24,2,2).
ligacao(21,31,2,1).
ligacao(21,32,-2,3).
ligacao(21,33,3,5).
ligacao(21,34,4,2).
ligacao(22,31,5,-4).
ligacao(22,32,-1,6).
ligacao(22,33,2,1).
ligacao(22,34,2,3).
ligacao(23,31,4,-3).
ligacao(23,32,3,5).
ligacao(23,33,4,1).
ligacao(23,34,-2,-3).
ligacao(24,31,1,-5).
ligacao(24,32,1,0).
ligacao(24,33,3,-1).
ligacao(24,34,-1,5).
ligacao(31,41,2,4).
ligacao(31,42,6,3).
ligacao(31,43,2,1).
ligacao(31,44,2,1).
ligacao(32,41,2,3).
ligacao(32,42,-1,0).
ligacao(32,43,0,1).
ligacao(32,44,1,2).
ligacao(33,41,4,-1).
ligacao(33,42,-1,3).
ligacao(33,43,7,2).
ligacao(33,44,5,-3).
ligacao(34,41,3,2).
ligacao(34,42,1,-1).
ligacao(34,43,2,4).
ligacao(34,44,1,-2).
ligacao(41,200,2,0).
ligacao(42,200,7,-2).
ligacao(43,200,-2,4).
ligacao(44,200,-1,-3).

ligacao(1,51,6,2).
ligacao(51,61,7,3).
ligacao(61,200,2,4).


% all_dfs/3 encontra todos os caminhos pelo Primeiro em Profundidade
% get_time/1 existe e obtemo tempo atual
% length/2 existe e obtemo comprimento de uma lista

all_dfs(Nome1,Nome2,LCam):-get_time(T1),
    findall(Cam,dfs(Nome1,Nome2,Cam),LCam),
    length(LCam,NLCam),
    get_time(T2),
    write(NLCam),write(' solucoes encontradas em '),
    T is T2-T1,write(T),write(' segundos'),nl,
    write('Lista de Caminhos possíveis: '),write(LCam),nl,nl.

% dfs

dfs(Orig,Dest,Cam):-dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-
    no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam).

% caminho mais curto

:-dynamic melhor_sol_minlig/2.

plan_minlig(Orig,Dest,LCaminho_minlig):-
    get_time(Ti),
    (melhor_caminho_minlig(Orig,Dest);true),
    retract(melhor_sol_minlig(LCaminho_minlig,_)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_minlig(Orig,Dest):-
    asserta(melhor_sol_minlig(_,10000)),
    dfs(Orig,Dest,LCaminho),
    atualiza_melhor_minlig(LCaminho),
    fail.

atualiza_melhor_minlig(LCaminho):-
    melhor_sol_minlig(_,N),
    length(LCaminho,C),
    C<N,retract(melhor_sol_minlig(_,_)),
    asserta(melhor_sol_minlig(LCaminho,C)).

% caminho mais forte

:-dynamic melhor_maisF/2.

plan_maisF(Orig,Dest,LCaminho_maisF):-
    get_time(Ti),
    (melhor_caminho_maisF(Orig,Dest);true),
    retract(melhor_maisF(LCaminho_maisF,_)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_maisF(Orig,Dest):-
    assert(melhor_maisF(_,0)),
    dfs(Orig,Dest,LCaminho),
    atualiza_melhor_maisF(LCaminho),
    fail.

atualiza_melhor_maisF(LCaminho):-
    melhor_maisF(_,N),
    calculo_caminho_maisF(LCaminho,C),
    C>N,retract(melhor_maisF(_,_)),
    assert(melhor_maisF(LCaminho,C)).

calculo_caminho_maisF([],0):-!.
calculo_caminho_maisF([_],0):-!.
calculo_caminho_maisF([X|[Y|Lc]],R):-
    calculo_caminho_maisF([Y|Lc],R1),
    no(X1,X,_),
    no(Y1,Y,_),
    ligacao(X1,Y1,A,B),!,
    R is A + B + R1.

% caminho mais seguro

:-dynamic melhor_maisSeguro/2.

plan_maisSeguro(Orig,Dest,Limite,LCaminho_maisF):-
    get_time(Ti),
    (melhor_caminho_maisSeguro(Orig,Dest,Limite);true),
    retract(melhor_maisSeguro(LCaminho_maisF,_)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_maisSeguro(Orig,Dest,Limite):-
    assert(melhor_maisSeguro(_,0)),
    dfsLim(Orig,Dest,LCaminho,Limite),
    atualiza_melhor_maisSeguro(LCaminho),
    fail.

atualiza_melhor_maisSeguro(LCaminho):-
    melhor_maisSeguro(_,N),
    calculo_caminho_maisF(LCaminho,C),
    C>N,retract(melhor_maisSeguro(_,_)),
    assert(melhor_maisSeguro(LCaminho,C)).


dfsLim(Orig,Dest,Cam,Limite):-
    dfsLim2(Orig,Dest,[Orig],Cam,Limite).

dfsLim2(Dest,Dest,LA,Cam,_):-!,reverse(LA,Cam).
dfsLim2(Act,Dest,LA,Cam,Limite):-
    no(NAct,Act,_),
    ( ligacao(NAct,NX,X1,Y1),(X1 + Y1 > Limite);ligacao(NX,NAct,X2,Y2),(X2 + Y2 > Limite) ),
    no(NX,X,_),
    \+ member(X,LA),
    dfsLim2(X,Dest,[X|LA],Cam,Limite).

% tamanho da rede

calculatamanho(Origem,0,Tamanho):-!,
    no(_,Origem,_),
    Tamanho is 0.

calculatamanho(Origem,N,Tamanho):-
    N1 is N-1,
    amigos_proximos(Origem,L),
    append([Origem],L,LX),
    mais_amigos(LX,T1,N1),
    Tamanho is T1 - 1.

amigos_proximos(Origem,L):-
    findall(X,ligacao(Origem,X,_,_),L2),
    findall(X,ligacao(X,Origem,_,_),L3),
    append(L2,L3,L).

mais_amigos(L2,X,0):-
    length(L2,X),!.

mais_amigos(L,Tamanho,N):-
    amigos_dos_amigos(L,L2),
    N1 is N-1,
    mais_amigos(L2,Tamanho,N1),!.

amigos_dos_amigos([],[]):-!.

amigos_dos_amigos([H|T],LR):-
    amigos_proximos(H,L),
    amigos_dos_amigos(T,L2),union(L,L2,LR).

% sugestoes conexoes por base tags

determinarLista(Origem,N,L2):-
    N1 is N-1,
    amigos_proximos(Origem,LX),
    append([],LX,LAMIGOS),
    mais_amigos2(LX,L,N1),deleteList(L,LAMIGOS,L1),
    deleteList(L1,[Origem],L3),
    lista(Origem,L3,L2).

lista(_,[],[]):-!.
lista(Origem,[X|L],[X|L1]):-shared_tags(Origem,X),lista(Origem,L,L1),!.
lista(Origem,[X|L],L1):-lista(Origem,L,L1).

mais_amigos2(_,[],0):-!.

mais_amigos2(L,Tamanho,N):-
    amigos_dos_amigos(L,L2),
    N1 is N-1,
    mais_amigos2(L2,Tamanho2,N1),
    union(Tamanho2,L2,Tamanho),!.

deleteList([],_,[]):-!.
deleteList([X|L],Z,F):-member(X,Z),!,deleteList(L,Z,F).
deleteList([X|L],Z,[X|F]):-deleteList(L,Z,F).

shared_tags(NodeOrig,Node2):-
    no(NodeOrig,_,LTOrig),
    no(Node2,_,LT2),
    shared_tags1(LTOrig,LT2).


shared_tags1(_,[]):-fail.
shared_tags1(LTOrig,[LH2|LT2]):-
    (member(LH2,LTOrig),!);shared_tags1(LTOrig,LT2).

% xtags em comum

xtags_comum(X,LTags,LUtz):-
    todas_combinacoes(X,LTags,LcombXTags),
    todos_utilizadores(LcombXTags,LUtz).

todos_utilizadores([],[]).
todos_utilizadores([Tags|LcombXTags],[Utz|LUtz]):-utilizador_xcomum(Tags,Utz),
        todos_utilizadores(LcombXTags,LUtz).

utilizador_xcomum(LTags,LUtz):-findall(Id,(no(Id,_,L),allMember(LTags,L)),LUtz).

todas_combinacoes(X,LTags,LcombXTags):-findall(L,combinacao(X,LTags,L),LcombXTags).

combinacao(0,_,[]):-!.
combinacao(X,[Tag|L],[Tag|T]):-X1 is X-1, combinacao(X1,L,T).
combinacao(X,[_|L],T):- combinacao(X,L,T).

allMember([],_):-!.
allMember([H|T],L):- member(H,L),allMember(T,L).



