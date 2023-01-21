import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import '../../../routes/app_pages.dart';

class LoginController extends GetxController {
  final read = GetStorage();
  var hiden = true.obs;

  var is_loading = false.obs;

  late TextEditingController nip = TextEditingController();
  late TextEditingController password = TextEditingController();

  loading() {
    is_loading.value = true;
    Future.delayed(Duration(minutes: 5), () {
      is_loading.value = false;
    });
  }
}
