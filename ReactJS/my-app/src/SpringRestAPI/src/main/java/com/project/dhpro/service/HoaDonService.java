package com.project.dhpro.service;

import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.KhachHang;

import java.util.List;

public interface HoaDonService {

    List<HoaDon> getAll();

    HoaDon save(HoaDon hoaDon);

    List<HoaDon> getHoaDonByKhachHang(KhachHang khachHang);

    HoaDon getHoaDonByID(int id);

    List<HoaDon> findAllByOrderByIdDesc();

}
