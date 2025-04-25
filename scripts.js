var gk_isXlsx = false;
        var gk_xlsxFileLookup = {};
        var gk_fileData = {};
        function filledCell(cell) {
          return cell !== '' && cell != null;
        }
        function loadFileData(filename) {
        if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
            try {
                var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                var firstSheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[firstSheetName];

                // Convert sheet to JSON to filter blank rows
                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                // Filter out blank rows (rows where all cells are empty, null, or undefined)
                var filteredData = jsonData.filter(row => row.some(filledCell));

                // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
                var headerRowIndex = filteredData.findIndex((row, index) =>
                  row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                );
                // Fallback
                if (headerRowIndex === -1 || headerRowIndex > 25) {
                  headerRowIndex = 0;
                }

                // Convert filtered JSON back to CSV
                var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
                csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                return csv;
            } catch (e) {
                console.error(e);
                return "";
            }
        }
        return gk_fileData[filename] || "";
        }
        


        const toggleBtn = document.getElementById('themeToggle');
      
        // لما المستخدم يضغط على زر التبديل
        toggleBtn.addEventListener('click', () => {
          document.body.classList.toggle('dark');
      
          const isDark = document.body.classList.contains('dark');
      
          // تحديث الأيقونة حسب الوضع
          toggleBtn.textContent = isDark ? '☀️' : '🌙';
      
          // حفظ الوضع في localStorage
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
      
        // عند تحميل الصفحة
        window.addEventListener('DOMContentLoaded', () => {
          const savedTheme = localStorage.getItem('theme');
          
          if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            toggleBtn.textContent = '☀️';
          } else if (savedTheme === 'light') {
            document.body.classList.remove('dark');
            toggleBtn.textContent = '🌙';
          } else {
            // أول مرة يدخل المستخدم حسب التوقيت
            const hour = new Date().getHours();
            if (hour >= 18 || hour < 6) {
              document.body.classList.add('dark');
              toggleBtn.textContent = '☀️';
              localStorage.setItem('theme', 'dark');
            } else {
              toggleBtn.textContent = '🌙';
              localStorage.setItem('theme', 'light');
            }
          }
        });
      




  AOS.init();



    window.addEventListener('DOMContentLoaded', () => {
      document.getElementById('welcomePopup').classList.remove('hidden');
    });
  
    function closePopup() {
      document.getElementById('welcomePopup').classList.add('hidden');
    }
    
//الكود الي تحت ده عشان الصورة الي في الكارت لوحدها تكبر لو مفيش اي نص موجود تحته وكدا يعني 
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.poster-card').forEach(card => {
    const desc = card.querySelector('p');
    const img = card.querySelector('img');

    if (desc && desc.textContent.trim().length < 60) {
      img.style.maxHeight = "350px"; // تزود الطول شوي
    }
  });
});
  


    // جلب الزر
    const backToTopBtn = document.getElementById('backToTopBtn');
  
    // عرض الزر عند التمرير لأسفل
    window.onscroll = function() {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };
  
    // وظيفة العودة للأعلى عند الضغط على الزر
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });