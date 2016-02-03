jQuery.extend(true, jQuery.magnificPopup.defaults, {
  callbacks: {
	imageLoadComplete: function(){
		var this_IMG = jQuery.magnificPopup.instance;
		if(this_IMG.currItem.type == "image"){

		var mfp_img_h = jQuery('.mfp-img').height();
		var ww = jQuery(window).width();
		var mfp_img_h_full = this_IMG.currItem.img.context.naturalHeight;
		var mfp_img_w_full = this_IMG.currItem.img.context.naturalWidth;
		//console.log(this_IMG.currItem.img.context.naturalWidth);
		var img_h;
		window.go_full = false;
		window.imgFullClick = false;
		window.imgIsClick = 0;
		window.txtFullBtn = 'Полный размер'; 	//[eng] - Full size; [rus] - Полный размер;
		window.txtCloseBtn = 'Закрыть';		//[eng] - Close; [rus] - Закрыть;
		
		if(mfp_img_w_full >= ww){
			img_h = Math.floor((mfp_img_h_full/mfp_img_w_full)*(ww));
			window.go_full = true;
			var left_ofset = (ww+mfp_img_w_full)/2;
			jQuery('.mfp-img').before('<span class="mfp_go_full_img">'+window.txtFullBtn+'</span>');
			jQuery('.mfp_go_full_img').hide();
			jQuery('.mfp_go_full_img').fadeIn(300);
			
		} else {
			img_h = mfp_img_h_full;
			jQuery('.mfp-img').before('<span class="mfp_go_full_img">'+window.txtFullBtn+'</span>');
			
		}
		
		jQuery('.mfp-img').css('cursor', 'pointer');
		jQuery('.mfp-img').css('max-width', mfp_img_w_full+'px');
		
		jQuery('.mfp-img').bind("click", function(){
		
		if(window.imgFullClick){
			jQuery('.mfp_go_full_img').html(window.txtCloseBtn);  
			this_IMG.close();
			window.imgFullClick = false;
		} else {
			window.imgFullClick = true;
			
			if(window.go_full){
				jQuery('.mfp_go_full_img').html(window.txtFullBtn); 
				jQuery('.mfp_go_full_img').fadeIn(300);
			}
			
		  if(window.imgIsClick == 0){
			jQuery(this).stop("true", "true").animate({'max-height' : img_h+'px'}, 800);
			jQuery('.mfp_go_full_img').html(window.txtCloseBtn);
			window.imgIsClick = 1;
		
		  } else if(window.imgIsClick == 2){
				window.imgIsClick = 0;
				this_IMG.close();
				jQuery('.mfp_go_full_img').unbind();
				jQuery('.mfp-img').unbind();
				window.imgFullClick = true;
		  } else {
				jQuery(this).stop("true", "true").animate({'max-height' : mfp_img_h+'px'}, 800);
				window.imgIsClick = 0;
				jQuery('.mfp_go_full_img').hide();
				jQuery('.mfp-wrap').css('overflow-x', 'hidden');
		  }
		  return false;
		  }
		});
		
		jQuery('.mfp_go_full_img').bind("click", function(){
					
					if(window.imgFullClick){
						window.imgIsClick = 0;
						this_IMG.close();
						jQuery('.mfp_go_full_img').unbind();
						jQuery('.mfp-img').unbind();
						window.imgFullClick = true;
					} 
					  if(window.imgIsClick <= 1){
					  var btn_fixed = (ww-(jQuery(this).width()))/2-10;
					  jQuery(this).css({'position':'fixed', 'left': btn_fixed+'px'});
						jQuery('.mfp-img').stop("true", "true").animate({'max-height' : mfp_img_h_full+'px', 'max-width' : mfp_img_w_full+'px'}, 1100);
						jQuery('.mfp-wrap').css('overflow-x', 'auto');
						window.imgIsClick = 2;
						window.imgFullClick = true;
						jQuery('.mfp_go_full_img').html(window.txtCloseBtn);
					  }
					  return false;
					});
	}
  }
  }
});
