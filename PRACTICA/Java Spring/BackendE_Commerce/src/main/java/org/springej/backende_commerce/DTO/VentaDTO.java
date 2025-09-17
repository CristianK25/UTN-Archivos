package org.springej.backende_commerce.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaDTO {

    @NotNull(message = "El ID del usuario es obligatorio")
    @Positive(message = "El ID del usuario debe ser positivo")
    private Long idUsuario;

    @NotNull(message = "La fecha de venta es obligatoria")
    private LocalDate fechaVenta;

    @NotEmpty(message = "La lista de productos no puede estar vacía")
    @Valid
    private List<ProductoVentaDTO> productos;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductoVentaDTO {

        @NotNull(message = "El ID del producto es obligatorio")
        @Positive(message = "El ID del producto debe ser positivo")
        private Long idProducto;

        @NotNull(message = "La cantidad es obligatoria")
        @Min(value = 1, message = "La cantidad debe ser al menos 1")
        private Integer cantidadProductoVenta;

        // ID de promoción opcional
        private Long idPromocion;
    }

    // Métodos helper
    public int getTotalProductos() {
        return productos != null ? productos.size() : 0;
    }

    public int getCantidadTotalItems() {
        return productos != null ?
                productos.stream().mapToInt(ProductoVentaDTO::getCantidadProductoVenta).sum() : 0;
    }
}