package adj.demo.sguecg10c.control;

import adj.demo.sguecg10c.model.User;
import adj.demo.sguecg10c.model.UserDTO;
import adj.demo.sguecg10c.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Get all users
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Get user by ID
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::toDTO);
    }

    // Create a user
    @Transactional
    public UserDTO createUser(UserDTO userDto) {
        User user = userDto.toEntity();

        Optional<User> existingByEmail = userRepository.findByEmail(user.getEmail());
        Optional<User> existingByTelephone = userRepository.findByTelephone(user.getTelephone());

        if (existingByEmail.isPresent()) {
            throw new RuntimeException("Y existe usuario con: " + user.getEmail());
        }

        if (existingByTelephone.isPresent()) {
            throw new RuntimeException("Ya existe usuario con: " + user.getTelephone());
        }

        User savedUser = userRepository.save(user);
        return toDTO(savedUser);
    }

    // Update a user
    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDto) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();

            // Update only if values are not null
            if (userDto.getName() != null) user.setName(userDto.getName());
            if (userDto.getEmail() != null) user.setEmail(userDto.getEmail());
            if (userDto.getTelephone() != null) user.setTelephone(userDto.getTelephone());

            User updatedUser = userRepository.save(user);
            return toDTO(updatedUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    // Delete a user
    @Transactional
    public UserDTO deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            userRepository.deleteById(id);
            return toDTO(user);
        } else {
            throw new RuntimeException("usuario no encontrado con el id: " + id);        }
    }

    // Convert from User to UserDTO
    private UserDTO toDTO(User user) {
        return UserDTO.fromEntity(user);
    }
}