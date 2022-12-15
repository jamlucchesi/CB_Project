package com.example.CommerceBankProject.repository;

import com.example.CommerceBankProject.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface accountRepository extends JpaRepository <Account,Long> {
}
