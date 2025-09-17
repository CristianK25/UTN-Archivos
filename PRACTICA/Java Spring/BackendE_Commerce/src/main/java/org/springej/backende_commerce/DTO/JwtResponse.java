package org.springej.backende_commerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor
public class JwtResponse {
    private String token;
    private String username;
    private List<String> roles;
}