package com.ssafy.seniornaver.auth.service;

import com.ssafy.seniornaver.auth.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword,String> {

}
