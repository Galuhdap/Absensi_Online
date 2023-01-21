import 'package:absent_app/app/data/api/api.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class CheckinController extends GetxController {
  final api = new Api();

  var is_Checkin = true.obs;
  var box = GetStorage();

  void setIsStatus(bool value) {
    is_Checkin.value = value;
  }

  controllerStatus() async {
    final response = await api.status();
    setIsStatus(response);
  }
}
