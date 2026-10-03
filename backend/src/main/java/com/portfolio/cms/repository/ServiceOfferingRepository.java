package com.portfolio.cms.repository;

import com.portfolio.cms.entity.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {
}
