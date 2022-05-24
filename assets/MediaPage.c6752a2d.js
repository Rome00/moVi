import{d as v,p as b,a as y,b as w,m as S,c as p,u as i,o as n,e as l,f as t,t as c,F as g,g as x,k as u,h as M,n as k,y as D}from"./index.852570de.js";import{_ as z}from"./RatingStar.f2fc0cf8.js";const $=v("MediaStore",{state:()=>({Movie:null,tvSeries:null}),getters:{certification(){var a,d;const s=(a=this.Movie)==null?void 0:a.release_dates.results,o=(d=this.tvSeries)==null?void 0:d.content_ratings.results;let e="";return s?e=s.filter(_=>_.iso_3166_1==="US")[0].release_dates[0].certification:e=o.filter(_=>_.iso_3166_1==="US")[0].rating,e},releaseDate(){var o,e,a;const s=new Date((a=(o=this.Movie)==null?void 0:o.release_date)!=null?a:(e=this.tvSeries)==null?void 0:e.first_air_date);return`${s.getDay()+1} - ${s.getMonth()} - ${s.getFullYear()}`},runTime(){var o,e,a;const s=(a=(o=this.Movie)==null?void 0:o.runtime)!=null?a:(e=this.tvSeries)==null?void 0:e.episode_run_time[0];return`${Math.floor(s/60)}h : ${s%60}m`},getCrew(){var a,d,_;const s=(_=(a=this.Movie)==null?void 0:a.credits.crew)!=null?_:(d=this.tvSeries)==null?void 0:d.credits.crew,o=s==null?void 0:s.filter(f=>f.job==="Director"),e=s==null?void 0:s.filter(f=>f.job==="Screenplay"||f.job==="Novel");return[...o,...e]},getCast(){var o,e,a;const s=(a=(o=this.Movie)==null?void 0:o.credits.cast)!=null?a:(e=this.tvSeries)==null?void 0:e.credits.cast;return s==null?void 0:s.slice(0,9)},getStatus:s=>{var o,e;return(e=(o=s.Movie)==null?void 0:o.status)!=null?e:s.tvSeries.status},getLanguage:s=>{var o,e,a;return new Intl.DisplayNames(["en"],{type:"language"}).of((a=(o=s.Movie)==null?void 0:o.original_language)!=null?a:(e=s.tvSeries)==null?void 0:e.original_language)},getImages:s=>{var o,e;return(e=(o=s.Movie)==null?void 0:o.images.backdrops.slice(0,20))!=null?e:s.tvSeries.images.backdrops.slice(0,20)},getNetwork:s=>{var o,e;return(e=(o=s.Movie)==null?void 0:o.production_companies[0])!=null?e:s.tvSeries.networks[0]},firstAir(){const s=new Date(this.tvSeries.first_air_date);return`${s.getDay()+1}-${s.getMonth()}-${s.getFullYear()}`},lastAir(){const s=new Date(this.tvSeries.last_air_date);return`${s.getDay()+1}-${s.getMonth()}-${s.getFullYear()}`},ratingAverage(){var s,o;return(o=(s=this.tvSeries)==null?void 0:s.vote_average)!=null?o:this.Movie.vote_average},budget:s=>{var o;return Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format((o=s.Movie)==null?void 0:o.budget)},revenue:s=>{var o;return Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format((o=s.Movie)==null?void 0:o.revenue)}},actions:{async loadMediaInfo(s){const o=b();o.loading=!0;const{id:e,type:a}=s,d=a==="movie"?"release_dates":"content_ratings";await y.get("https://api.themoviedb.org/3/"+a+"/"+e+"?api_key=da4d11234eb9fbd69aa0dd7c6323eff9&append_to_response="+d+",credits,images").then(_=>{a==="movie"?this.Movie=_.data:this.tvSeries=_.data,o.loading=!1})}}}),N={key:0,class:"bg-gray-100"},C={class:"bg-cover bg-top"},I={class:"bg-gradient-to-t from-gray-800/90 via-gray-800/80 to-gray-800/90"},F={class:"container mx-auto"},U={class:"flex flex-col items-center px-10 py-[30px] md:flex-row md:items-start"},A={class:"h-[450px] w-[300px] min-w-[300px] overflow-hidden rounded-md"},L=["src"],T=["src"],j={class:"flex flex-wrap content-center items-start text-white md:pl-10"},B={class:"font-barlow text-5xl font-bold"},V={class:"mt-2 flex w-full flex-wrap font-raleway text-base"},Y={class:"rounded-sm border px-1 opacity-60"},E={class:"before:px-2 before:content-['\\2022'] after:px-2 after:content-['\\2022']"},O={class:"after:px-2 after:content-['\\2022']"},R={id:"runTime",class:""},Q={class:"mt-5 flex w-full flex-col"},q={class:"text-white/60"},G={class:"mt-5 flex flex-col text-white"},H=t("div",{class:"font-display text-2xl font-medium"},"Overview",-1),J={class:"mt-2"},K={class:"mt-6 flex w-full justify-between"},P={class:"font-base text-center text-lg"},W={class:"text-center text-sm"},X={key:0,class:"flex items-center"},Z={class:"font-raleway capitalize"},tt=D(" Created By: "),et={class:"font-medium italic"},st={class:"container mx-auto mt-10 px-4"},it={class:"flex flex-col md:flex-row"},ot={class:"order-2 flex flex-col md:order-1 md:w-[calc(100%-200px)]"},at=t("h3",{class:"mb-6 bg-gradient-to-r from-primary-default via-indigo-500 bg-clip-text text-xl font-medium text-transparent"}," Top Billed Cast ",-1),rt={class:"flex overflow-x-auto"},nt={class:"block h-[175px] w-[140px]"},lt=["src"],ct={class:"text px-2.5 pt-2.5 text-base font-medium text-black"},dt={class:"text px-2.5 pt-2.5 text-xs text-black"},_t={class:"mt-8 mb-20 border-t border-gray-300"},gt=t("h3",{class:"mt-8 mb-6 bg-gradient-to-r from-primary-default via-indigo-500 to-indigo-400 bg-clip-text text-xl font-medium text-transparent"}," Media ",-1),ft={class:"flex overflow-x-auto"},mt=["src"],xt={class:"relative order-1 mb-6 flex min-w-[200px] flex-col space-y-4 bg-gradient-to-r from-zinc-500/5 via-transparent to-transparent py-5 pl-5 font-raleway md:order-2"},pt={class:"flex flex-col"},ut=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," Status: ",-1),ht={class:"flex flex-col"},vt=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," Original Language: ",-1),bt={key:0,class:"text-base font-medium"},yt={class:"flex flex-col"},wt=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," first air date: ",-1),St={class:"text-base font-medium"},Mt={class:"flex flex-col"},kt=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," Last air date: ",-1),Dt={class:"text-base font-medium"},zt={class:"flex flex-col"},$t=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," number of series: ",-1),Nt={class:"text-base font-medium"},Ct={class:"flex flex-col"},It=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," Networks ",-1),Ft={class:"space-y-2 text-base"},Ut={class:"inline-flex max-w-[64px]"},At=["src"],Lt={class:"flex flex-col"},Tt=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," budget: ",-1),jt={class:"text-base font-medium"},Bt={class:"flex flex-col"},Vt=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," revenue: ",-1),Yt={class:"text-base font-medium"},Et={class:"flex flex-col"},Ot=t("span",{class:"bg-gradient-to-r from-primary-light via-rose-400 to-indigo-400 bg-clip-text text-lg font-bold capitalize text-transparent"}," studios: ",-1),Rt={class:"flex flex-wrap text-base"},Qt={key:0,class:"mr-3 inline-flex max-w-[84px]"},qt=["src"],Pt=w({setup(s){const o=S(),e=$();e.Movie=null,e.tvSeries=null;const a={id:parseInt(o.params.id),type:o.params.media};e.loadMediaInfo(a);const d=p(()=>e.Movie),_=p(()=>e.tvSeries),f=p(()=>d.value?d.value.genres:_.value.genres),m=p(()=>"https://image.tmdb.org/t/p/");return(Gt,Ht)=>i(e).Movie||i(e).tvSeries?(n(),l("main",N,[t("section",C,[t("div",I,[t("div",F,[t("div",U,[t("figure",A,[i(d)?(n(),l("img",{key:0,src:i(m)+"w500"+i(d).poster_path},null,8,L)):(n(),l("img",{key:1,src:i(m)+"w500"+i(_).poster_path},null,8,T))]),t("div",j,[t("h1",B,c(i(d)?i(d).original_title:i(_).original_name),1),t("div",V,[t("span",Y,c(i(e).certification),1),t("span",E,c(i(e).releaseDate),1),(n(!0),l(g,null,x(i(f),r=>(n(),l("span",{key:r.id,class:"flex flex-wrap space-x-2"},[t("span",O,c(r.name),1)]))),128)),t("span",R,c(i(e).runTime),1)]),t("div",Q,[t("h2",q,c(i(d)?i(d).tagline:i(_).tagline),1),t("div",G,[H,t("p",J,c(i(d)?i(d).overview:i(_).overview),1)]),t("div",K,[(n(!0),l(g,null,x(i(e).getCrew,r=>(n(),l("div",{key:r.id,class:"flex flex-col"},[t("div",P,c(r.name),1),t("div",W,c(r.job),1)]))),128))]),i(e).tvSeries?(n(),l("div",X,[t("div",Z,[tt,t("span",et,c(i(e).tvSeries.created_by[0].name),1)])])):u("",!0),M(z,{class:"mt-4",size:"w-6 h-6",rating:i(e).ratingAverage},null,8,["rating"])])])])])])]),t("section",st,[t("div",it,[t("div",ot,[at,t("div",rt,[(n(!0),l(g,null,x(i(e).getCast,r=>(n(),l("div",{key:r.id,class:"m-3 min-w-[138px] max-w-[140px] overflow-hidden rounded-md pb-3 shadow-md"},[t("figure",nt,[t("img",{class:"h-full w-full",src:i(m)+"w185"+r.profile_path},null,8,lt)]),t("p",ct,c(r.name),1),t("p",dt,c(r.character),1)]))),128))]),t("div",_t,[gt,t("div",ft,[(n(!0),l(g,null,x(i(e).getImages,(r,h)=>(n(),l("figure",{key:h,class:"mb-3 w-80 min-w-[300px] px-0.5"},[t("img",{src:i(m)+"w300"+r.file_path,alt:""},null,8,mt)]))),128))])])]),t("aside",xt,[t("div",pt,[ut,t("span",{class:k(["text-base",[i(e).getStatus==="Released"?"font-font-semibold text-teal-600":"font-medium text-black",i(e).getStatus==="Ended"?"font-semibold italic text-red-600":"font-semibold text-amber-500"]])},c(i(e).getStatus),3)]),t("div",ht,[vt,i(e).getLanguage?(n(),l("span",bt,c(i(e).getLanguage),1)):u("",!0)]),i(e).tvSeries?(n(),l(g,{key:0},[t("div",yt,[wt,t("span",St,c(i(e).firstAir),1)]),t("div",Mt,[kt,t("span",Dt,c(i(e).firstAir),1)]),t("div",zt,[$t,t("span",Nt,c(i(e).tvSeries.number_of_episodes),1)]),t("div",Ct,[It,t("ul",Ft,[(n(!0),l(g,null,x(i(e).tvSeries.networks,r=>(n(),l("li",{key:r.id,class:"mt-3 flex items-center"},[t("figure",Ut,[t("img",{class:"h-auto w-full",src:i(m)+"/w154"+r.logo_path},null,8,At)])]))),128))])])],64)):(n(),l(g,{key:1},[t("div",Lt,[Tt,t("span",jt,c(i(e).budget),1)]),t("div",Bt,[Vt,t("span",Yt,c(i(e).revenue),1)]),t("div",Et,[Ot,t("ul",Rt,[(n(!0),l(g,null,x(i(e).Movie.production_companies,r=>(n(),l("li",{key:r.id,class:"mt-4 flex items-center"},[r.logo_path?(n(),l("figure",Qt,[t("img",{class:"h-auto w-full",src:i(m)+"/w154"+r.logo_path},null,8,qt)])):u("",!0)]))),128))])])],64))])])])])):u("",!0)}});export{Pt as default};
