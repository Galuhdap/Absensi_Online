import 'package:absent_app/app/data/api/api.dart';
import 'package:absent_app/app/routes/app_pages.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

import '../../checkin/controllers/checkin_controller.dart';
import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  final read = GetStorage();
  final api = new Api();
  final ctrl = Get.put(CheckinController());

  @override
  Widget build(BuildContext context) {
    ctrl.controllerStatus();
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(15, 30, 15, 0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/img/Vector.png',
                width: 100,
                height: 100,
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                'ABSENSI',
                style: GoogleFonts.poppins(
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
              Text(
                'O N L I N E',
                style: GoogleFonts.poppins(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFFAAAAAA),
                ),
              ),
              SizedBox(
                height: 15,
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                'Selamat Datang',
                style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFFAAAAAA),
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Text(
                "${read.read('decodeToken')['nama']}",
                style: GoogleFonts.poppins(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
              SizedBox(
                height: 80,
              ),
              MaterialButton(
                onPressed: () {
                  Get.toNamed(Routes.CHECKIN);
                },
                minWidth: double.infinity,
                height: 55,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Lanjutkan ${read.read('decodeToken')['nip_user']}",
                      style: GoogleFonts.poppins(
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFFF2D7CF3),
                      ),
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Icon(
                      Icons.arrow_forward,
                      color: Color(0xFFF2D7CF3),
                    )
                  ],
                ),
              ),
              SizedBox(
                height: 20,
              ),
              InkWell(
                onTap: (() {
                  Get.toNamed(Routes.LOGIN);
                }),
                child: Text(
                  'Ganti Akun',
                  style: GoogleFonts.poppins(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    decoration: TextDecoration.underline,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
