package com.project.dhpro.service;

import com.project.dhpro.models.KhachHang;
import com.project.dhpro.repository.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class KhachHangServiceImp implements KhachHangService{
    @Autowired
    KhachHangRepository khachHangRepository;

    @Override
    public List<KhachHang> getAll() {
        return khachHangRepository.findAll();
    }
}
