package org.springej.usuario_tarea.controller;

import org.springej.usuario_tarea.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tareas")
public class TareaController {

    @Autowired
    private TareaService service;

}
