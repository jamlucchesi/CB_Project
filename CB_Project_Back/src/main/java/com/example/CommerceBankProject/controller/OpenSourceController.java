package com.example.CommerceBankProject.controller;

import com.example.CommerceBankProject.domain.OpenSource;
import com.example.CommerceBankProject.service.OpenSourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class OpenSourceController {
    private final OpenSourceService openSourceService;
    //Returns all open sources in a primitive format as well as the
    //account that created the project

    @GetMapping("/open_sources")
    public ResponseEntity<?> findAllOpenSources(){return new ResponseEntity<>
            (openSourceService.findAllOpenSource(), HttpStatus.OK);}
    //Returns all open sources with specified column type 'STATUS' of specified number
    // example:
    //localhost:8080/open_sources/-1 | 0 | 1
    @GetMapping("/open_sources/{status}")
    public ResponseEntity<?> findAllOpenSourcesStatus(@PathVariable int status) throws Exception
    {return new ResponseEntity<>(openSourceService.listInProgressOpenSource(status), HttpStatus.OK);}
    //Creates an open source with specified account ID using ID from account table
    // Must be used in conjunction with Postman
    @PostMapping("/open_sources/create/{accountId}")
    public ResponseEntity<?> saveOpenSource
            (@RequestBody OpenSource openSource, @PathVariable String accountId)
            throws ClassNotFoundException {
        return new ResponseEntity<>(openSourceService.createOpenSource(openSource,
                        Long.valueOf(accountId)), HttpStatus.CREATED);
    }
    //Works similarly to account delete
    // Deletes a specified project via first argument followed by the account number
    //that requested the project. PROJECT MUST MATCH ITS FOREIGN KEY TO ACCOUNT ID IN ACCOUNT TABLE
    // use: localhost:8080/open_sources/delete/PROJECTID/ACCOUNT ID
    @DeleteMapping("/open_sources/delete/{projnumber}/{accnumber}")
    public ResponseEntity<?> deleteOpenSource
            (@PathVariable("projnumber") Long openSourceId,
             @PathVariable("accnumber") Long accId) throws ClassNotFoundException {
        return new ResponseEntity<>(openSourceService.deleteOpenSource
                (Long.valueOf(openSourceId),Long.valueOf(accId)), HttpStatus.OK);
    }

}
