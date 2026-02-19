package com.admin_service.admin_service.repository;

import com.admin_service.admin_service.model.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {
    Page<Report> findByStatus(Report.ReportStatus status, Pageable pageable);

    long countByStatus(Report.ReportStatus status);
}
