import { supabase } from '../lib/supabase';

// --- Transformers ---
const transformProduct = (record) => ({
  ...record,
  imageUrl: record.image_url,
  variants: record.variants || { colors: [], sizes: [] },
  rating: record.rating || { average: 0, count: 0 },
  reviews: record.reviews || [],
  specifications: record.specifications || []
});

const transformPost = (record) => ({
  ...record,
  imageUrl: record.image_url,
  readTime: record.read_time,
});

const transformOrder = (record) => ({
  ...record,
  customerName: record.customer_name,
});

const transformProfile = (record) => ({
  ...record,
  dateJoined: record.date_joined,
});

const transformCoupon = (record) => ({
  ...record,
  discountType: record.discount_type,
  expirationDate: record.expiration_date,
  usageLimit: record.usage_limit,
  usageCount: record.usage_count,
});

// --- API Service ---
const apiService = {
  // --- Products ---
  getProducts: async () => {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (error) throw new Error(error.message);
    return data.map(transformProduct);
  },
  
  createProduct: async (productData) => {
    const dbPayload = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image_url: productData.imageUrl,
      category: productData.category,
      rating: productData.rating,
      variants: productData.variants,
      specifications: productData.specifications
    };
    const { data, error } = await supabase.from('products').insert([dbPayload]).select().single();
    if (error) throw new Error(error.message);
    return transformProduct(data);
  },
  
  updateProduct: async (id, updatedData) => {
    const dbPayload = {};
    if (updatedData.name) dbPayload.name = updatedData.name;
    if (updatedData.description) dbPayload.description = updatedData.description;
    if (updatedData.price) dbPayload.price = updatedData.price;
    if (updatedData.imageUrl) dbPayload.image_url = updatedData.imageUrl;
    if (updatedData.category) dbPayload.category = updatedData.category;
    
    const { data, error } = await supabase.from('products').update(dbPayload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return transformProduct(data);
  },
  
  deleteProduct: async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // --- Blog Posts ---
  getBlogPosts: async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').order('id', { ascending: false });
    if (error) throw new Error(error.message);
    return data.map(transformPost);
  },
  
  createBlogPost: async (postData) => {
    const dbPayload = {
      title: postData.title,
      category: postData.category,
      author: postData.author,
      read_time: postData.readTime,
      excerpt: postData.excerpt,
      image_url: postData.imageUrl,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    const { data, error } = await supabase.from('blog_posts').insert([dbPayload]).select().single();
    if (error) throw new Error(error.message);
    return transformPost(data);
  },

  updateBlogPost: async (id, updatedData) => {
    const dbPayload = {};
    if (updatedData.title) dbPayload.title = updatedData.title;
    if (updatedData.imageUrl) dbPayload.image_url = updatedData.imageUrl;
    if (updatedData.readTime) dbPayload.read_time = updatedData.readTime;
    const { data, error } = await supabase.from('blog_posts').update(dbPayload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return transformPost(data);
  },
  
  deleteBlogPost: async (id) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // --- Orders ---
  getOrders: async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data.map(transformOrder);
  },
  
  updateOrderStatus: async (id, status) => {
    const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return transformOrder(data);
  },

  // --- Users ---
  getUsers: async () => {
    const { data, error } = await supabase.from('profiles').select('*').order('date_joined', { ascending: false });
    if (error) throw new Error(error.message);
    return data.map(transformProfile);
  },
  
  createUser: async (userData) => {
    const { data, error } = await supabase.from('profiles').insert([{ name: userData.name, email: userData.email, role: userData.role }]).select().single();
    if (error) throw new Error(error.message);
    return transformProfile(data);
  },
  
  updateUser: async (id, updatedData) => {
    const { data, error } = await supabase.from('profiles').update(updatedData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return transformProfile(data);
  },
  
  deleteUser: async (id) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // --- Coupons ---
  getCoupons: async () => {
    const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data.map(transformCoupon);
  },

  createCoupon: async (couponData) => {
    const dbPayload = {
      code: couponData.code,
      discount_type: couponData.discountType,
      value: couponData.value,
      expiration_date: couponData.expirationDate,
      usage_limit: couponData.usageLimit,
    };
    const { data, error } = await supabase.from('coupons').insert([dbPayload]).select().single();
    if (error) throw new Error(error.message);
    return transformCoupon(data);
  },

  deleteCoupon: async (id) => {
    const { error } = await supabase.from('coupons').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // --- Site Settings ---
  getSiteSettings: async () => {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
  },

  updateSiteSettings: async (settingsData) => {
    const dbPayload = {};
    if (settingsData.logoUrl) dbPayload.logo_url = settingsData.logoUrl;
    if (settingsData.siteName) dbPayload.site_name = settingsData.siteName;

    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ id: 1, ...dbPayload }, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  uploadLogo: async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabase.storage
      .from('site-assets')
      .getPublicUrl(fileName);

    return { publicUrl: urlData.publicUrl };
  },
};

export default apiService;
