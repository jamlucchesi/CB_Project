package com.example.CommerceBankProject.repository;

import com.example.CommerceBankProject.domain.OpenSource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OpenSourceRepository extends JpaRepository<OpenSource,Long> {
    //specifies how the listing of findAllByStatus in open source service will be done
    //in this case data will only be selected if status is == to given status
    List<OpenSource> findAllByStatus(int status);
}
