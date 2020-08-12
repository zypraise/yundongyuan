export function numBMIScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (sex == '男') {
		if (n < 18) {
			r = 10;
		} else if (n >= 18 && n < 18.3) {
			r = 9;
		} else if (n >= 18.3 && n < 18.7) {
			r = 8;
		} else if (n >= 18.7 && n < 19.1) {
			r = 7;
		} else if (n >= 19.1 && n < 19.5) {
			r = 6;
		} else if (n >= 19.5 && n < 19.9) {
			r = 5;
		} else if (n >= 19.9 && n < 20.3) {
			r = 4;
		} else if (n >= 20.3 && n < 20.7) {
			r = 3;
		} else if (n >= 20.7 && n < 21.1) {
			r = 2;
		} else if (n >= 21.1 && n < 22) {
			r = 1;
		} else if (n >= 22) {
			r = 0;
		}
	} else {
		if (n < 20) {
			r = 10;
		} else if (n >= 20 && n < 20.3) {
			r = 9;
		} else if (n >= 20.3 && n < 20.7) {
			r = 8;
		} else if (n >= 20.7 && n < 21.1) {
			r = 7;
		} else if (n >= 21.1 && n < 21.5) {
			r = 6;
		} else if (n >= 21.1 && n < 21.9) {
			r = 5;
		} else if (n >= 21.1 && n < 22.3) {
			r = 4;
		} else if (n >= 22.1 && n < 22.7) {
			r = 3;
		} else if (n >= 22.1 && n < 23.1) {
			r = 2;
		} else if (n >= 23.1 && n < 24) {
			r = 1;
		} else if (n >= 24) {
			r = 0;
		}
	}
	return r;
}
export function numSitForwardScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n >= 40) {
		r = 10;
	} else if (n < 40 && n >= 39) {
		r = 9;
	} else if (n < 39 && n >= 38) {
		r = 8;
	} else if (n < 38 && n >= 37) {
		r = 7;
	} else if (n < 37 && n >= 36) {
		r = 6;
	} else if (n < 36 && n >= 35) {
		r = 5;
	} else if (n < 35 && n >= 34) {
		r = 4;
	} else if (n < 34 && n >= 31) {
		r = 3;
	} else if (n < 31 && n >= 28) {
		r = 2;
	} else if (n < 28 && n >= 25) {
		r = 1;
	} else if (n < 25) {
		r = 0;
	}
	return r;
}
export function numThirtyMeterDashScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n <= 4.5) {
		r = 10;
	} else if (n > 4.5 && n <= 4.6) {
		r = 9;
	} else if (n > 4.6 && n <= 4.7) {
		r = 8;
	} else if (n > 4.7 && n <= 4.8) {
		r = 7;
	} else if (n > 4.8 && n <= 4.9) {
		r = 6;
	} else if (n > 4.9 && n <= 5.0) {
		r = 5;
	} else if (n > 5.0 && n <= 5.1) {
		r = 4;
	} else if (n > 4.5 && n <= 5.2) {
		r = 3;
	} else if (n > 5.2) {
		r = 0;
	}
	return r;
}
export function numVerticalJumpScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (sex == '男') {
		if (n >= 55) {
			r = 10;
		} else if (n >= 54 && n < 55) {
			r = 9;
		} else if (n >= 53 && n < 54) {
			r = 8;
		} else if (n >= 52 && n < 53) {
			r = 7;
		} else if (n >= 51 && n < 52) {
			r = 6;
		} else if (n >= 50 && n < 51) {
			r = 5;
		} else if (n >= 47 && n < 50) {
			r = 4;
		} else if (n >= 43 && n < 47) {
			r = 3;
		} else if (n >= 39 && n < 43) {
			r = 2;
		} else if (n >= 35 && n < 39) {
			r = 1;
		} else if (n < 35) {
			r = 0;
		}
	} else {
		if (n >= 50) {
			r = 10;
		} else if (n >= 49 && n < 50) {
			r = 9;
		} else if (n >= 48 && n < 49) {
			r = 8;
		} else if (n >= 47 && n < 48) {
			r = 7;
		} else if (n >= 46 && n < 47) {
			r = 6;
		} else if (n >= 45 && n < 46) {
			r = 5;
		} else if (n >= 42 && n < 45) {
			r = 4;
		} else if (n >= 38 && n < 42) {
			r = 3;
		} else if (n >= 34 && n < 38) {
			r = 2;
		} else if (n >= 30 && n < 34) {
			r = 1;
		} else if (n < 30) {
			r = 0;
		}
	}
	return r;
}
export function numRelativeSquatMaxStrengthScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n > 1.2) {
		r = 10;
	} else if (n >= 1.1 && n < 1.2) {
		r = 8;
	} else if (n >= 1.0 && n < 1.1) {
		r = 5;
	} else if (n >= 0.9 && n < 1.0) {
		r = 3;
	} else if (n >= 0.8 && n < 0.9) {
		r = 2;
	} else if (n >= 0.7 && n < 0.8) {
		r = 1;
	} else if (n < 0.7) {
		r = 0;
	}
	return r;
}
export function numRelativeLyingPushMaxStrengthScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n > 1.2) {
		r = 10;
	} else if (n >= 1.1 && n < 1.2) {
		r = 8;
	} else if (n >= 1.0 && n < 1.1) {
		r = 5;
	} else if (n >= 0.9 && n < 1.0) {
		r = 3;
	} else if (n >= 0.8 && n < 0.9) {
		r = 2;
	} else if (n >= 0.7 && n < 0.8) {
		r = 1;
	} else if (n < 0.7) {
		r = 0;
	}
	return r;
}
export function numPullUpScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (sex == '男') {
		if (n >= 40) {
			r = 10;
		} else if (n >= 39 && n < 40) {
			r = 9;
		} else if (n >= 38 && n < 39) {
			r = 8;
		} else if (n >= 37 && n < 38) {
			r = 7;
		} else if (n >= 36 && n < 37) {
			r = 6;
		} else if (n >= 35 && n < 36) {
			r = 5;
		} else if (n >= 31 && n < 35) {
			r = 4;
		} else if (n >= 27 && n < 31) {
			r = 3;
		} else if (n >= 23 && n < 27) {
			r = 2;
		} else if (n >= 18 && n < 23) {
			r = 1;
		} else if (n < 18) {
			r = 0;
		}
	} else {
		if (n >= 35) {
			r = 10;
		} else if (n >= 34 && n < 35) {
			r = 9;
		} else if (n >= 33 && n < 34) {
			r = 8;
		} else if (n >= 32 && n < 33) {
			r = 7;
		} else if (n >= 31 && n < 32) {
			r = 6;
		} else if (n >= 30 && n < 31) {
			r = 5;
		} else if (n >= 26 && n < 30) {
			r = 4;
		} else if (n >= 22 && n < 26) {
			r = 3;
		} else if (n >= 18 && n < 22) {
			r = 2;
		} else if (n >= 13 && n < 18) {
			r = 1;
		} else if (n < 13) {
			r = 0;
		}
	}
	return r;
}
export function numAbdominalEnduranceScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n >= 120) {
		r = 10;
	} else if (n >= 115 && n < 120) {
		r = 9;
	} else if (n >= 110 && n < 115) {
		r = 8;
	} else if (n >= 105 && n < 110) {
		r = 7;
	} else if (n >= 100 && n < 105) {
		r = 6;
	} else if (n >= 90 && n < 100) {
		r = 5;
	} else if (n >= 80 && n < 90) {
		r = 4;
	} else if (n >= 70 && n < 80) {
		r = 3;
	} else if (n >= 60 && n < 70) {
		r = 2;
	} else if (n >= 30 && n < 60) {
		r = 1;
	} else if (n < 30) {
		r = 0;
	}
	return r;
}
export function numBackMuscleEnduranceScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n >= 120) {
		r = 10;
	} else if (n >= 115 && n < 120) {
		r = 9;
	} else if (n >= 110 && n < 115) {
		r = 8;
	} else if (n >= 105 && n < 110) {
		r = 7;
	} else if (n >= 100 && n < 105) {
		r = 6;
	} else if (n >= 90 && n < 100) {
		r = 5;
	} else if (n >= 80 && n < 90) {
		r = 4;
	} else if (n >= 70 && n < 80) {
		r = 3;
	} else if (n >= 60 && n < 70) {
		r = 2;
	} else if (n >= 30 && n < 60) {
		r = 1;
	} else if (n < 30) {
		r = 0;
	}
	return r;
}
export function numThreeKmScore(_n, sex) {
	var n = _n.toString().replace(':', '');
	var r;
	if(n == 0){
		return 0
	}
	if (sex == '男') {
		if (n <= 11.00) {
			r = 10;
		} else if (n <= 11.30 && n > 11.00) {
			r = 9;
		} else if (n <= 12.00 && n > 11.30) {
			r = 8;
		} else if (n <= 12.30 && n > 12.00) {
			r = 6;
		} else if (n <= 13.00 && n > 12.30) {
			r = 4;
		} else if (n <= 13.30 && n > 13.00) {
			r = 2;
		} else if (n <= 14.00 && n > 13.30) {
			r = 1;
		} else if (n > 14.00) {
			r = 0;
		}
	} else {
		if (n <= 11.30) {
			r = 10;
		} else if (n <= 12.00 && n > 11.30) {
			r = 9;
		} else if (n <= 12.30 && n > 12.00) {
			r = 8;
		} else if (n <= 13.00 && n > 12.30) {
			r = 6;
		} else if (n <= 13.30 && n > 13.00) {
			r = 4;
		} else if (n <= 14.00 && n > 13.30) {
			r = 2;
		} else if (n <= 14.30 && n > 14.00) {
			r = 1;
		} else if (n > 14.30) {
			r = 0;
		}
	}
	return r;
}
export function numTwoKmDynamometerScore(_n, sex) {
	var n = _n.toString().replace(':', '');
	var r;
	if(n == 0){
		return 0
	}
	if (sex == '男') {
		if (n <= 8.00) {
			r = 10;
		} else if (n <= 8.30 && n > 8.00) {
			r = 9;
		} else if (n <= 9.00 && n > 8.30) {
			r = 8;
		} else if (n <= 9.30 && n > 9.00) {
			r = 6;
		} else if (n <= 10.00 && n > 9.30) {
			r = 4;
		} else if (n <= 10.30 && n > 10.00) {
			r = 2;
		} else if (n <= 11.00 && n > 10.30) {
			r = 1;
		} else if (n > 11.00) {
			r = 0;
		}
	} else {
		if (n <= 9.00) {
			r = 10;
		} else if (n <= 9.30 && n > 9.00) {
			r = 9;
		} else if (n <= 10.00 && n > 9.30) {
			r = 8;
		} else if (n <= 10.30 && n > 10.00) {
			r = 6;
		} else if (n <= 11.00 && n > 10.30) {
			r = 4;
		} else if (n <= 11.30 && n > 11.00) {
			r = 2;
		} else if (n <= 12.00 && n > 11.30) {
			r = 1;
		} else if (n > 12.00) {
			r = 0;
		}
	}
	return r;
}


export function numJiaoScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n >= 120) {
		r = 10;
	} else if (n >= 115 && n < 120) {
		r = 9;
	} else if (n >= 110 && n < 115) {
		r = 8;
	} else if (n >= 105 && n < 110) {
		r = 6;
	} else if (n >= 100 && n < 105) {
		r = 4;
	} else if (n >= 90 && n < 100) {
		r = 2;
	} else if (n >= 80 && n < 90) {
		r = 1;
	} else if (n >= 70 && n < 80) {
		r = 0;
	}else if (n >= 60 && n < 70) {
		r = 0;
	}else if (n < 60) {
		r = 0;
	}
	return r;
}

export function numLimbRatioScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (n < 1) {
		r = 5;
	} else if (n >= 1 && n < 3.2) {
		r = 4;
	} else if (n >= 3.2 && n < 5.5) {
		r = 3;
	} else if (n >= 5.5 && n < 7.8) {
		r = 2;
	} else if (n >= 7.8 && n < 10) {
		r = 1;
	} else if (n >= 10) {
		r = 0;
	}
	return r;
}

export function numUpperLimbScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (sex == '男') {
		if (n >= 6) {
			r = 5;
		} else if (n >= 5.7 && n < 6) {
			r = 4;
		} else if (n >= 5.4 && n < 5.7) {
			r = 3;
		} else if (n >= 5.1 && n < 5.4) {
			r = 2;
		} else if (n >= 4.2 && n < 5.1) {
			r = 1;
		} else if (n < 4.2) {
			r = 0;
		}
	} else {
		if (n >= 4) {
			r = 5;
		} else if (n >= 3.5 && n < 4) {
			r = 4;
		} else if (n >= 3.0 && n < 3.5) {
			r = 3;
		} else if (n >= 2.5 && n < 3.0) {
			r = 2;
		} else if (n >= 1.5 && n < 2.5) {
			r = 1;
		} else if (n < 1.5) {
			r = 0;
		}
	}
	return r;
}
export function numLowerLimbScore(n, sex) {
	var r;
	if(n == 0){
		return 0
	}
	if (sex == '男') {
		if (n >= 17) {
			r = 5;
		} else if (n >= 16 && n < 17) {
			r = 4;
		} else if (n >= 15 && n < 16) {
			r = 3;
		} else if (n >= 14 && n < 15) {
			r = 2;
		} else if (n >= 12 && n < 14) {
			r = 1;
		} else if (n < 12) {
			r = 0;
		}
	} else {
		if (n >= 13) {
			r = 5;
		} else if (n >= 12 && n < 13) {
			r = 4;
		} else if (n >= 11 && n < 12) {
			r = 3;
		} else if (n >= 10 && n < 11) {
			r = 2;
		} else if (n >= 8 && n < 10) {
			r = 1;
		} else if (n < 8) {
			r = 0;
		}
	}
	return r;
}