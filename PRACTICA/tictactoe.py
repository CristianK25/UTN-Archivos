"""
Tic Tac Toe Player
"""

import math
import copy

X = "X"
O = "O"
EMPTY = None


def initial_state():
    """
    Returns starting state of the board.
    """
    return [[EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]]


def player(board):
    """
    Returns player who has the next turn on a board.
    """
    contador_x = 0
    contador_o = 0
    
    for i in range(3):
        for j in range(3):
            if board[i][j] == X:
                contador_x += 1
            elif board[i][j] == O:
                contador_o += 1
                
    if contador_x > contador_o:
        return O
    else:
        return X
    


def actions(board):
    """
    Returns set of all possible actions (i, j) available on the board.
    """
    
    posibles_jugadas = set()
    
    for i in range(3):
        for j in range(3):
            if board[i][j] == EMPTY:
                jugada = (i,j)
                posibles_jugadas.add(jugada)
                
    return posibles_jugadas
    


def result(board, action):
    """
    Returns the board that results from making move (i, j) on the board.
    """
    
    tablero_copia = copy.deepcopy(board)
    
    if tablero_copia[action[0]][action[1]] == EMPTY:
        tablero_copia[action[0]][action[1]] = player(tablero_copia)
        return tablero_copia
    else:
        return ValueError ("Celda Ocupada")


def winner(board):
    """
    Returns the winner of the game, if there is one.
    """
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] and board[i][0] != EMPTY:
            return board[i][0]
        
        elif board[0][i] == board[1][i] == board [2][i] and board[0][i] != EMPTY:
            return board[0][i]
        
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] != EMPTY:
        return board[0][0]
        
    if board[2][0] == board[1][1] == board[0][2] and board[1][1] != EMPTY:
        return board[2][0]
        
    return None


def terminal(board):
    """
    Returns True if game is over, False otherwise.
    """
    if winner(board) != None:
        return True
    
    for i in range(3):
        for j in range(3):
            if board[i][j] == EMPTY:
                return False
            
    return True
            


def utility(board):
    """
    Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    """
    if winner(board) == X:
        return 1
    elif winner(board) == O:
        return -1
    else:
        return 0

def max_value(board):
    
    if terminal(board):
        return utility(board)
    
    v = float('-inf')
    
    for accion in actions(board):
        tablero = result(board,accion)
        v = max(v,min_value(tablero))
        
    return v

def min_value(board):
    if terminal(board):
        return utility(board)
    
    v = float('inf')
    
    for accion in actions(board):
        tablero = result(board,accion)
        v = min(v,max_value(tablero))
        
    return v

def minimax(board):
    """
    Returns the optimal action for the current player on the board.
    """
    if terminal(board):
        return None
    
    jugador = player(board)
    
    if jugador == X: #debo buscar la jugada con mejor puntuacion
        mejor_valor = float('-inf')
        mejor_accion = None
        
        for accion in actions(board):
            nuevo_tablero = result(board,accion)
            valor = min_value(nuevo_tablero)
            if valor > mejor_valor:
                mejor_valor = valor
                mejor_accion = accion
                #if mejor_valor == 1:
                    #return mejor_accion
                
    else:
        mejor_valor = float('inf')
        mejor_accion = None
        
        for accion in actions(board):
            nuevo_tablero = result(board,accion)
            valor = max_value(nuevo_tablero)
            if valor < mejor_valor:
                mejor_valor = valor
                mejor_accion = accion
                #if mejor_valor == -1:
                    #return mejor_accion
                
    return mejor_accion
        