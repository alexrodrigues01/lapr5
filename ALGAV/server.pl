:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).


server(Port) :-						
        http_server(http_dispatch, [port(Port)]).