<template>
  <div v-if="!loading" id="app-root" class="bg-gray-100 min-h-screen p-8">
    <!-- دکمه پرینت -->
    <div class="max-w-5xl mx-auto mb-6 text-left print:hidden">
      <button @click="printInvoice"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200">
        🖨️ پرینت فاکتور
      </button>
    </div>

    <!-- صفحه فاکتور -->
    <div id="invoice"
      class="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">

      <!-- سربرگ جذاب با لوگو و عنوان شرکت -->
      <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 print:p-4 relative">
        <div class="flex justify-between items-start">
          <!-- لوگو و عنوان -->
          <div class="flex items-center gap-4">
            <div class="w-40 h-40 bg-white rounded-[50%] flex items-center justify-center shadow-lg">
              <img src="../assets/images/logo.png" alt="logo">
            </div>
            <div>
              <h1 class="text-2xl font-bold">شرکت تکین آراز پرگاس</h1>
              <p class="text-sm text-blue-200 mt-1">منطقه آزاد مازندران</p>
            </div>
          </div>

          <!-- اطلاعات سمت راست سربرگ -->
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-sm space-y-1">
            <div><span class="font-semibold">تاریخ:</span> {{ new Date(request.created_at).toLocaleDateString('fa') }}
            </div>
            <div><span class="font-semibold">شماره فاکتور:</span> TAP-{{ request.id }}</div>
            <div><span class="font-semibold">پیوست:</span> ندارد</div>
            <div><span class="font-semibold">وضعیت:</span> <span class="text-green-300">
                {{ getStatusText(request.status) }}
              </span></div>
          </div>
        </div>
      </div>

      <div class="p-6 print:p-4">
        <!-- مشخصات فروشنده و خریدار -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- مشخصات فروشنده -->
          <div class="border rounded-xl p-4 bg-gray-50">
            <h3 class="font-bold text-lg text-blue-900 border-b pb-2 mb-3">🏢 مشخصات فروشنده</h3>
            <div class="space-y-1 text-sm">
              <p><span class="font-semibold">شرکت:</span> تکین آراز پرگاس منطقه آزاد مازندران</p>
              <p><span class="font-semibold">شناسه ملی:</span> 14014931710</p>
              <p><span class="font-semibold">شماره تماس:</span> 09930908466</p>
              <p><span class="font-semibold">آدرس:</span> منطقه آزاد مازندران، بخش صنعتی میرود، خیابان شهرک صنعتی، پلاک
                6</p>
            </div>
          </div>

          <!-- مشخصات خریدار -->
          <div class="border rounded-xl p-4">
            <h3 class="font-bold text-lg text-blue-900 border-b pb-2 mb-3">👤 مشخصات خریدار</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">شرکت / خانم / آقا</label>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-800">
                  {{ request.user?.full_name }}
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">شماره شناسنامه</label>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-800">
                  {{ request.user?.birth_certificate_number }}
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">کدملی</label>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-800">
                  {{ request.user?.national_code }}

                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">شماره تماس</label>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-800">
                  {{ request.user?.mobile }}

                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">آدرس</label>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-800">
                  {{ request.user?.address }}

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- جدول اطلاعات ماشین -->
        <div class="mb-6 overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="border p-2">ردیف</th>
                <th class="border p-2">نام خودرو</th>
                <th class="border p-2">برند</th>
                <th class="border p-2">تعداد</th>
                <th class="border p-2">فی (دلار)</th>
                <th class="border p-2">مبلغ واریزی (تومان)</th>
                <th class="border p-2">توضیحات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-2 text-center">{{ 1 }}</td>
                <td class="border p-2"><input type="text" :value="request.car?.name"
                    class="w-full min-w-[100px] border rounded p-1"></td>
                <td class="border p-2"><input type="text" :value="request.car?.brand?.title"
                    class="w-full min-w-[80px] border rounded p-1"></td>
                <td class="border p-2"><input type="number" value="1" class="w-20 border rounded p-1">
                </td>
                <td class="border p-2"><input type="text" :value="price" class="w-24 border rounded p-1">
                </td>
                <td class="border p-2"><input type="text" :value="paidSubTotal" class="w-32 border rounded p-1"></td>
                <td class="border p-2"><input type="text" class="w-full min-w-[120px] border rounded p-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- باکس توضیحات اضافی -->
        <div class="mb-6">
          <label class="block font-semibold mb-2">📝 توضیحات اضافی:</label>
          <textarea rows="2"
            class="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
        </div>

        <!-- توضیحات قانونی و بانکی -->
        <div class="bg-amber-50 border-r-4 border-amber-500 p-4 rounded-xl text-sm space-y-2 mb-6">
          <p>💰 احتراماً مبلغ پیش فاکتور باید به شماره شبا <span
              class="font-mono font-bold">IR500190000000222253644007</span> به نام <strong>شرکت تکین آراز پرگاس</strong>
            نزد بانک صادرات شعبه مدرس واریز نمایید.</p>
          <p>🚗 شایان ذکر است به ازای هر دستگاه خودرو هزینه حمل و نقل و عوارض و مالیات و گمرکی پس از تعیین مبلغ نهایی
            محاسبه می‌گردد و به مبلغ قیمت خودرو اضافه می‌شود.</p>
          <p>📄 در صورت پلاک گذاری، هزینه پلاک گذاری جدا محاسبه می‌شود.</p>
          <p>✅ کلیه تعهدات شرکت، تخلیه خودرو در بندر مربوطه می‌باشد.</p>
          <p>⏰ اعتبار پیش فاکتور 48 ساعت می‌باشد.</p>
        </div>

        <!-- امضا -->
        <div class="flex justify-between items-center mt-8 pt-4 border-t">
          <div class="text-sm">امضاء و مهر فروشنده: _________________</div>
          <div class="text-sm">امضاء خریدار: _________________</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRequest } from '@/stores/modules/requests';
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useErrors } from '@/composables/useError';
const { displayError } = useErrors();

const store = useRequest();
const route = useRoute();
const router = useRouter();

let loading = ref(true);
let request = computed(() => {
  return store.getRequest
})
const getStatusText = (status) => {
  const texts = {
    'pending': 'در انتظار بررسی',
    'pre_registration': 'پیش ثبت نام',
    'invitation_to_attend': 'دعوت به حضور',
    'delivered': 'تحویل داده شده',
  };
  return texts[status] || status;
};

const init = async () => {
  try {
    loading.value = true;
    await store.loadItem(route.params.id);
    loading.value = false;
    nextTick(() => {
      checkMobileVersion()
    })
  } catch (err) {
    displayError(err);
  } finally {
    loading.value = false;
  }
};
let price = computed(() => {
  return Number(request.value.price).toLocaleString('fa')
});
let paidSubTotal = computed(() => {
  let total = request.value.receipts.reduce((sum, re) => {
    if (re.status == "accepted") {
      return sum + re.amount;
    }
    return sum;
  }, 0);
  return Number(total).toLocaleString('fa')
});
onMounted(async () => {
  await init();
});
function printInvoice() {
  window.print();
}
function checkMobileVersion() {
  if (window.innerWidth < 768) {
    window.print();
    router.push("/user-panel/requests")
  }
}
</script>
<style scoped>
/* استایل‌های مخصوص چاپ */
@media print {

  /* نمایش رنگ‌ها و پس‌زمینه‌ها در چاپ */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  /* مخفی کردن همه چیز خارج از کامپوننت */
  body * {
    visibility: hidden !important;
  }

  /* نمایش فقط محتوای فاکتور */
  #invoice,
  #invoice * {
    visibility: visible !important;
  }

  /* اطمینان از نمایش کامل فاکتور */
  #invoice {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
    z-index: 99999 !important;
  }

  /* تنظیم حاشیه صفحه */
  @page {
    size: A4;
    margin: 0.5cm;
  }

  /* مخفی کردن دکمه‌ها و المان‌های غیرضروری */
  button,
  .print\:hidden {
    display: none !important;
  }

  /* حفظ پس‌زمینه‌ها */
  .bg-gray-100 {
    background-color: #f3f4f6 !important;
  }

  .bg-gradient-to-r {
    background: linear-gradient(to right, #1e3a8a, #312e81) !important;
  }

  .from-blue-900 {
    background-color: #1e3a8a !important;
  }

  .to-indigo-900 {
    background-color: #312e81 !important;
  }

  .bg-white\/10 {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .bg-amber-50 {
    background-color: #fffbeb !important;
  }

  .bg-gray-50 {
    background-color: #f9fafb !important;
  }

  .bg-blue-900 {
    background-color: #1e3a8a !important;
  }

  /* حفظ رنگ متن‌ها */
  .text-white {
    color: white !important;
  }

  .text-blue-200 {
    color: #bfdbfe !important;
  }

  .text-green-300 {
    color: #86efac !important;
  }

  .text-blue-900 {
    color: #1e3a8a !important;
  }

  /* حذف سایه‌ها (اختیاری - می‌خوای بمونه؟) */
  .shadow-2xl,
  .shadow-lg,
  .shadow-md {
    box-shadow: none !important;
  }

  /* تبدیل input ها به متن معمولی ولی با حفظ ظاهر */
  input,
  textarea {
    border: 1px solid #e5e7eb !important;
    background: #f9fafb !important;
    padding: 4px !important;
    outline: none !important;
  }

  /* نمایش border های جدول */
  table,
  th,
  td {
    border: 1px solid #ddd !important;
    border-collapse: collapse !important;
  }

  /* جلوگیری از شکستن صفحه در وسط جدول */
  table,
  tr,
  td,
  th {
    page-break-inside: avoid !important;
  }

  /* تنظیم فاصله‌ها */
  .p-6,
  .p-4 {
    padding: 0.5cm !important;
  }

  .mb-6,
  .mb-8 {
    margin-bottom: 0.5cm !important;
  }
}
</style>