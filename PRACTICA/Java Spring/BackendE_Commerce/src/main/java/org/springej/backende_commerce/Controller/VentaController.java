package org.springej.backende_commerce.Controller;

import org.springej.backende_commerce.Model.Venta;
import org.springej.backende_commerce.Service.VentaService;
import org.springej.backende_commerce.DTO.VentaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/ventas")
public class VentaController {

    private static final Logger logger = LoggerFactory.getLogger(VentaController.class);

    @Autowired
    private VentaService ventaService;

    // POST /ventas → Registrar una venta nueva
    @PostMapping
    public ResponseEntity<Venta> registrarVenta(@RequestBody @Valid VentaDTO ventaDTO) {
        logger.info("Registrando venta para usuario ID: {}", ventaDTO.getIdUsuario());
        Venta nuevaVenta = ventaService.registrarVenta(ventaDTO);
        logger.info("Venta registrada con ID: {}", nuevaVenta.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
    }

    // GET /ventas/usuario/{idUsuario} → Obtener todas las ventas de un usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Venta>> obtenerVentasPorUsuario(@PathVariable Long idUsuario) {
        logger.info("Obteniendo ventas para usuario ID: {}", idUsuario);
        List<Venta> ventas = ventaService.obtenerVentasPorUsuario(idUsuario);
        if (ventas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(ventas);
    }
}
