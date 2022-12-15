package com.example.CommerceBankProject.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Getter
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String username;
    @NotNull
    private String password;
    private String phoneNumber;
    private String email;
    private String firstName;
    private String lastName;
    private boolean usertype;
    @JsonIgnore
    @OneToMany(targetEntity = com.example.CommerceBankProject.
            domain.OpenSource.class,mappedBy = "account")
    private Set<OpenSource> openSources;
    public Set<OpenSource> getOpenSources(){return openSources;}
}
