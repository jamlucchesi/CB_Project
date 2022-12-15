package com.example.CommerceBankProject.controller;

import com.example.CommerceBankProject.domain.Account;
import com.example.CommerceBankProject.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class AccountController {
    private final AccountService accountService;
    @GetMapping("/hello")
    public String HelloWorld(){
        return "Hello World";
    }
    //must use POSTMAN to use this feature
    //use JSON format to create a new account in Postman
    @PostMapping("/account")
    public ResponseEntity<?> save (@RequestBody Account account){
        return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);
    }
    //deletes an account, no "verification" uses id from account table to delete
    //said account
    //Use: localhost:8080/accounts/ID Number
    @DeleteMapping(value ="/accounts/{id}")
    public ResponseEntity<?>remove(@PathVariable("id") String id) throws ClassNotFoundException {
        return new ResponseEntity<>(accountService.deleteAccount(Long.valueOf(id)), HttpStatus.OK);
    }
    //Lists all accounts in a primitive format
    //Use: localhost:8080/accounts
    @GetMapping("/accounts")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>
                (accountService.findAll(), HttpStatus.OK);
    }
    //"Accept" button handler first num parameter requires a
    //"approver" denoted in account table in the "USERTYPE" column == TRUE
    //(false equals normal user)
    //this sets a project to the status of approved status of '1'
    //'0' is default for pending and '-1' will be used for denied
    //use for this goes something like:
    // localhost:8080/accept/approver account id/projectid(found in 'PROJECTID' in Project table)
    @PatchMapping("/accept/{num}/{num2}")
    public ResponseEntity<?>accept(@PathVariable("num") String accId,
                                   @PathVariable("num2") String projectId) {
        return new ResponseEntity<>(accountService.accepter
                (Long.valueOf(accId),Long.valueOf(projectId)), HttpStatus.OK);
    }
    //same function as above, except it changes status of project to '-1'
    //requires 'approver' account id
    @PatchMapping("/deny/{num1}/{num2}")
    public ResponseEntity<?> deny(@PathVariable("num1") Long accId,
                                  @PathVariable("num2") Long projectId){
        return new ResponseEntity<>(accountService.deny(accId, projectId), HttpStatus.OK);
    }
}

