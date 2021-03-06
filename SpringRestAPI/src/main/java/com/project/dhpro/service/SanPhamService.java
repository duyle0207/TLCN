package com.project.dhpro.service;

import com.project.dhpro.models.SanPham;

import java.util.List;

public interface SanPhamService {
    List<SanPham> getAll();

    SanPham findById(int id);

    SanPham save(SanPham sanPham);

    List<SanPham> searchSanPhamAdmin(String keyword);

    SanPham findSanPhamByTenSP(String tensp);

    void deleteSanPham(int id);
}
