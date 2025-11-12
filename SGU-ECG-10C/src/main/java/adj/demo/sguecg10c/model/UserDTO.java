package adj.demo.sguecg10c.model;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String telephone;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public UserDTO() {
    }

    public static UserDTO fromEntity(User bed) {
        UserDTO dto = new UserDTO();
        dto.setId(bed.getId());
        dto.setName(bed.getName());
        dto.setEmail(bed.getEmail());
        dto.setTelephone(bed.getTelephone());
        return dto;
    }

    // Convert from BedDto to BedBean
    public User toEntity() {
        User user = new User();
        user.setId(this.id);
        user.setName(this.name);
        user.setEmail(this.email);
        user.setTelephone(this.telephone);
        return user;
    }
}
