package com.example.CommerceBankProject.service;

import com.example.CommerceBankProject.domain.Account;
import com.example.CommerceBankProject.domain.OpenSource;
import com.example.CommerceBankProject.repository.OpenSourceRepository;
import com.example.CommerceBankProject.repository.accountRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class OpenSourceService {
    private final OpenSourceRepository openSourceRepository;
    private final accountRepository accountRepository;
    @Transactional
    public OpenSource createOpenSource(OpenSource openSource, Long accountId) throws ClassNotFoundException {
        Account acc = accountRepository.findById(accountId).orElseThrow(()
                -> new ClassNotFoundException("No account with id: " + accountId));
        openSource.setAccount(acc);
        String pattern = "dd MMM yyyy HH:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        openSource.setDateRequested(date);
        openSource.setStatus(0);
        return openSourceRepository.save(openSource);
    }
    @Transactional
    public Map<String, Boolean> deleteOpenSource(@PathVariable(value = "id") Long openSourceId, Long accId)
            throws ClassNotFoundException {
        OpenSource openSource = openSourceRepository.findById(openSourceId)
                .orElseThrow(() -> new ClassNotFoundException("Open Source not found for this id :: " + openSourceId));
        Account account = accountRepository.getById(accId);
        Map<String, Boolean> response = new HashMap<>();
        if (openSource.getid() == account) {
            openSourceRepository.delete(openSource);
            response.put("Open source deleted", Boolean.TRUE);
        }
        else
            response.put("Open source not deleted", Boolean.FALSE);
        return response;
    }

    public List<OpenSource> findAllOpenSource(){
        return openSourceRepository.findAll();
    }

    public List<OpenSource> listInProgressOpenSource(@PathVariable int status) throws Exception {
        if(status <= 1 && status >= -1)
            return openSourceRepository.findAllByStatus(status);
        else
            throw new Exception("Arguments out of bounds");
    }
}
