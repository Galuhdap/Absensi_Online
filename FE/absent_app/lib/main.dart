import 'package:absent_app/app/utils/SplashScreen.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

import 'app/routes/app_pages.dart';

void main() async {
  await GetStorage.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // return FutureBuilder(
    //   future: Future.delayed(Duration(seconds: 3)),
    //   builder: (context, AsyncSnapshot snapshot) {
    //     if (snapshot.connectionState == ConnectionState.waiting) {
    //       return MaterialApp(
    //         home: splashScreen(),
    //       );
    //     } else {
    //       return GetMaterialApp(
    //         title: "Application",
    //         initialRoute: Routes.LOGIN,
    //         getPages: AppPages.routes,
    //       );
    //     }
    //   },
    // );
    // return MaterialApp(
    //   home: splashScreen(),
    // );
    return GetMaterialApp(
      title: "Application",
      initialRoute: Routes.LOGIN,
      getPages: AppPages.routes,
    );
  }
}
