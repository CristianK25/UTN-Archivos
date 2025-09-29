package org.jcr;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.jcr.entidades.Persona;

public class Main {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pruebaJpa_PU");
        EntityManager em = emf.createEntityManager();

        try {
            // --- GUARDADO CON ROLLBACK ---
            em.getTransaction().begin();

            Persona p1 = new Persona();
            p1.setNombre("Juan con rollback");
            em.persist(p1);

            // Se cancela la transacción, no se guarda en la base
            em.getTransaction().rollback();
            System.out.println("Persona con rollback no fue guardada.");

            // --- GUARDADO CON COMMIT ---
            em.getTransaction().begin();

            Persona p2 = new Persona();
            p2.setNombre("Juan guardado");
            em.persist(p2);

            em.getTransaction().commit();
            System.out.println("Persona guardada con ID: " + p2.getId());

            // --- ACTUALIZACIÓN ---
            em.getTransaction().begin();

            Persona personaAActualizar = em.find(Persona.class, p2.getId());
            if (personaAActualizar != null) {
                personaAActualizar.setNombre("Juan actualizado");
                // No hace falta llamar a merge si la entidad está gestionada
            }

            em.getTransaction().commit();
            System.out.println("Persona actualizada.");

            // --- BÚSQUEDA ---
            Long idABuscar = p2.getId();
            Persona personaEncontrada = em.find(Persona.class, idABuscar);

            if (personaEncontrada != null) {
                System.out.println("Persona encontrada: " + personaEncontrada.getNombre());
            } else {
                System.out.println("No se encontró una persona con ID: " + idABuscar);
            }

        } finally {
            em.close();
            emf.close();
        }
    }
}