package adj.demo.sguecg10c.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndTelephone(String email, String telephone);
    Optional<User> findByEmail(String email);
    Optional<User> findByTelephone(String telephone);
}
