import 'package:absent_app/app/data/providers/user_login_provider.dart';
import 'package:absent_app/app/routes/app_pages.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../data/api/api.dart';
import '../controllers/checkin_controller.dart';

class CheckinView extends GetView<CheckinController> {
  final box = GetStorage();
  var api = new Api();
  @override
  Widget build(BuildContext context) {
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
                height: 50,
              ),
              Text(
                'User',
                style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFFAAAAAA),
                ),
              ),
              Text(
                "${box.read('decodeToken')['nama']}",
                style: GoogleFonts.poppins(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
              SizedBox(
                height: 80,
              ),
              Obx(
                () => MaterialButton(
                  onPressed: () async {
                    // ctrl.enabled();
                    var datas = box.read('decodeToken')["nip_user"];
                    if (controller.is_Checkin.value) {
                      null;
                    } else {
                      await api.checkin(datas);
                      controller.controllerStatus();
                      showDialog(
                        context: context,
                        builder: (BuildContext context) => AlertDialog(
                          title: Text('Sucsess Checkin'),
                          content: Text('Jangan Lupa Lakukan Checkout'),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Get.back();
                              },
                              child: Text('Ok'),
                            ),
                          ],
                        ),
                      );
                    }
                  },
                  minWidth: double.infinity,
                  height: 55,
                  color: controller.is_Checkin.value
                      ? Color(0xFFFE5E5E5)
                      : Color(0xFFFFFD600),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Text(
                    'C H E C K  I N',
                    style: GoogleFonts.poppins(
                      fontSize: 16,
                      color: controller.is_Checkin.value
                          ? Color(0xFFFAAAAAA)
                          : Color(0xFFF2D7CF3),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Obx(
                () => MaterialButton(
                  onPressed: () async {
                    // ctrl.enabled();

                    var datas = box.read('decodeToken')["nip_user"];
                    if (controller.is_Checkin.value) {
                      await api.checkout(datas);
                      controller.controllerStatus();
                      showDialog(
                        context: context,
                        builder: (BuildContext context) => AlertDialog(
                          title: Text('Sucsess Checkout'),
                          content: Text('Jangan Lupa CheckIn Tepat Waktu'),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Get.back();
                              },
                              child: Text('Ok'),
                            ),
                          ],
                        ),
                      );
                    } else {
                      null;
                    }
                  },
                  minWidth: double.infinity,
                  height: 55,
                  color: !controller.is_Checkin.value
                      ? Color(0xFFFE5E5E5)
                      : Color(0xFFFFFD600),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Text(
                    'C H E C K  O U T',
                    style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: !controller.is_Checkin.value
                            ? Color(0xFFFAAAAAA)
                            : Color(0xFFF2D7CF3)),
                  ),
                ),
              ),
              SizedBox(
                height: 20,
              ),
              InkWell(
                onTap: (() async {
                  await api.logout();

                  box.erase();
                  Get.offAllNamed(Routes.LOGIN);
                }),
                child: Text(
                  'Logout',
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
