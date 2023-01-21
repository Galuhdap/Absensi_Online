import 'package:absent_app/app/data/api/api.dart';
import 'package:absent_app/app/routes/app_pages.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

import '../controllers/login_controller.dart';

class LoginView extends GetView<LoginController> {
  final box = GetStorage();
  @override
  Widget build(BuildContext context) {
    var api = new Api();

    var status = Get.put(LoginController());
    return Scaffold(
      body: Obx(
        () => status.is_loading.value
            ? Center(
                child: LoadingAnimationWidget.horizontalRotatingDots(
                  color: Colors.blue,
                  size: 50,
                ),
              )
            : Center(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(15, 80, 15, 0),
                  child: SingleChildScrollView(
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
                        TextField(
                          controller: controller.nip,
                          autocorrect: false,
                          keyboardType: TextInputType.phone,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: Colors.yellow,
                                width: 2,
                              ),
                            ),
                            hintText: 'Masukan NIP',
                          ),
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        Obx(
                          () => TextField(
                            controller: controller.password,
                            autocorrect: false,
                            obscureText: controller.hiden.value,
                            decoration: InputDecoration(
                              suffixIcon: IconButton(
                                  onPressed: () {
                                    controller.hiden.toggle();
                                  },
                                  icon: controller.hiden.isTrue
                                      ? Icon(Icons.remove_red_eye)
                                      : Icon(Icons.remove_red_eye_outlined)),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                  color: Colors.yellow,
                                  width: 2,
                                ),
                              ),
                              hintText: 'Masukan Password',
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 7,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            InkWell(
                              onTap: (() {
                                showDialog(
                                  context: context,
                                  builder: (BuildContext context) =>
                                      AlertDialog(
                                    title: Text('Anouncement !!'),
                                    content: Text(
                                        'Silakan Hubungi Admin \nUntuk Mengubah Password'),
                                    actions: [
                                      TextButton(
                                        onPressed: () {
                                          Get.back();
                                        },
                                        child: Text('OK'),
                                      ),
                                    ],
                                  ),
                                );
                              }),
                              child: Text(
                                'Ganti Password',
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
                        SizedBox(
                          height: 150,
                        ),
                        MaterialButton(
                          onPressed: () async {
                            status.loading();
                            bool log = await api.login(
                                controller.nip.text, controller.password.text);
                            if (log == true) {
                              Get.toNamed(Routes.HOME);
                            } else {
                              print('tidak Berhasil');
                              showDialog(
                                context: context,
                                builder: (BuildContext context) => AlertDialog(
                                  title: Text('Warning!!'),
                                  content: Text('nip & Password Is Wrong!'),
                                  actions: [
                                    TextButton(
                                        onPressed: () {
                                          Get.back();
                                        },
                                        child: Text('OK'))
                                  ],
                                ),
                              );
                            }
                          },
                          minWidth: double.infinity,
                          height: 55,
                          color: Color(0xFFFFFD600),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15),
                          ),
                          child: Text(
                            'L O G I N',
                            style: GoogleFonts.poppins(
                              fontSize: 16,
                              color: Color(0xFFF2D7CF3),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
      ),
    );
  }
}
