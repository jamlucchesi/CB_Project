package com.example.CommerceBankProject.service;

import com.example.CommerceBankProject.domain.Account;
import com.example.CommerceBankProject.domain.OpenSource;
import com.example.CommerceBankProject.repository.OpenSourceRepository;
import com.example.CommerceBankProject.repository.accountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final accountRepository accountRepository;
    private final OpenSourceRepository openSourceRepository;
    @Transactional
    public Account create(Account account){
        return accountRepository.save(account);
    }
    @Transactional
    public Map<String, Boolean> deleteAccount(@PathVariable(value = "id") Long accountId)
            throws ClassNotFoundException {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ClassNotFoundException("Account not found for this" +
                        " id :: " + accountId));
        accountRepository.delete(account);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Account deleted", TRUE);
        return response;
    }

    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    @Transactional
    public Map<String, Boolean> accepter(@PathVariable(value = "id") Long accId,
                                         @PathVariable(value = "projectID") Long projectId){
        Account acc = accountRepository.getById(accId);
        Map<String,Boolean> response = new HashMap<>();
        if(acc.isUsertype() == TRUE){
            OpenSource os = openSourceRepository.getById(projectId);
            os.setStatus(1);
            String pattern = "dd MMM yyyy HH:mm:ss";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String date = simpleDateFormat.format(new Date());
            os.setDateFinal(date);
            response.put("Project accepted!", TRUE);
        }
        else
            response.put("Security check not met", FALSE);
        return response;
    }

    @Transactional
    public Map<String, Boolean> deny(Long accId, Long projectId){
        Account acc = accountRepository.getById(accId);
        Map<String,Boolean> response = new HashMap<>();
        if(acc.isUsertype() == TRUE){
            OpenSource os = openSourceRepository.getById(projectId);
            os.setStatus(-1);
            String pattern = "dd MMM yyyy HH:mm:ss";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String date = simpleDateFormat.format(new Date());
            os.setDateFinal(date);
            response.put("Project denied!", TRUE);
        }
        else
            response.put("Security check not met", FALSE);
        return response;
    }
}
