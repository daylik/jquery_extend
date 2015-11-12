jQuery.extend(true, jQuery.magnificPopup.defaults, {
  callbacks: {
	open: function(){
		var this_IMG =  jQuery.magnificPopup.instance;
		//console.log(this_IMG.currItem.type);
		if(this_IMG.currItem.type == "image"){
		
		var f_size_click = 0;
		var mfp_img_h = jQuery('.mfp-img').height();
		var ww = jQuery(window).width();
		var mfp_img_h_full = this_IMG.currItem.img.context.naturalHeight;
		var mfp_img_w_full = this_IMG.currItem.img.context.naturalWidth;
		var img_h = '';
		var go_full = false;
		
		if(mfp_img_w_full >= ww){
			img_h = (mfp_img_h_full/mfp_img_w_full)*(ww);
			go_full = true;
			var left_ofset = (ww+mfp_img_w_full)/2;
			jQuery('.mfp-img').before('<span class="mfp_go_full_img">Полный размер</span>'); //[eng] - Full size; [rus] - Полный размер;
			jQuery('.mfp_go_full_img').hide();
		} else {
			img_h = mfp_img_h_full;
		}
		
		jQuery('.mfp-img').css('cursor', 'pointer');
		jQuery('.mfp-img').click(function(){
		
		  if(f_size_click == 0){
			jQuery(this).stop("true", "true").animate({'max-height' : img_h+'px'}, 700);
			f_size_click = 1;
			if(go_full){
				jQuery('.mfp_go_full_img').html('Полный размер'); //[eng] - Full size; [rus] - Полный размер;
				jQuery('.mfp_go_full_img').fadeIn(300);
				
				jQuery('.mfp_go_full_img').bind("click", function(){
				
					if(f_size_click == 2){
						f_size_click = 1;
						this_IMG.close();
						
					} 
					  if(f_size_click == 1){
					  var btn_fixed = (ww-(jQuery(this).width()))/2-10;
					  jQuery(this).css({'position':'fixed', 'left': btn_fixed+'px'});
						jQuery('.mfp-img').stop("true", "true").animate({'max-height' : mfp_img_h_full+'px', 'max-width' : mfp_img_w_full+'px'}, 700);
						jQuery('.mfp-wrap').css('overflow-x', 'auto');
						f_size_click = 2;
						jQuery('.mfp_go_full_img').html('Закрыть');  //[eng] - Close; [rus] - Закрыть;
					  }
					  return false;
					});
			}
		  } else if(f_size_click == 2){
				f_size_click = 1;
			jQuery('.mfp_go_full_img').unbind();
		  } else {
			jQuery('.mfp_go_full_img').unbind();
			jQuery(this).stop("true", "true").animate({'max-height' : mfp_img_h+'px'}, 700);
				f_size_click = 0;
			jQuery('.mfp_go_full_img').hide();
			jQuery('.mfp-wrap').css('overflow-x', 'hidden');
		  }
		  return false;
		});
	 
	}
  }
  }
});