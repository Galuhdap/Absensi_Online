import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class splashScreen extends StatelessWidget {
  const splashScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset('assets/img/Vector.png'),
            SizedBox(
              height: 50,
            ),
            Text(
              'ABSENSI',
              style: GoogleFonts.poppins(
                fontSize: 37,
                fontWeight: FontWeight.bold,
                color: Colors.blue,
              ),
            ),
            Text(
              'O N L I N E',
              style: GoogleFonts.poppins(
                fontSize: 17,
                fontWeight: FontWeight.bold,
                color: Color(0xFFFAAAAAA),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
