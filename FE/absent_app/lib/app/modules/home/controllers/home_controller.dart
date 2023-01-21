import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

import '../../../routes/app_pages.dart';

class HomeController extends GetxController {
  var is_loading = false.obs;

  loading() {
    Future.delayed(Duration(minutes: 5), () {
      is_loading.value = true;
    });
    Get.toNamed(Routes.CHECKIN);
  }
}
