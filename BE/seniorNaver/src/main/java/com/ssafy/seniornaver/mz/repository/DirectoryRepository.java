package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.Directory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface DirectoryRepository extends JpaRepository<Directory, Long> {
}
