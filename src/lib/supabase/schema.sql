-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Obras table
CREATE TABLE IF NOT EXISTS obras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  categoria TEXT CHECK (categoria IN ('digital', 'mixto', 'otro')) NOT NULL DEFAULT 'otro',
  imagen_url TEXT,
  imagenes_adicionales TEXT[],
  año INTEGER,
  tecnica TEXT,
  dimensiones TEXT,
  descripcion TEXT,
  disponible_en_tienda BOOLEAN DEFAULT FALSE,
  tipo_venta TEXT CHECK (tipo_venta IN ('original', 'print', 'ambos')),
  precio_original NUMERIC(10,2),
  precio_print_base NUMERIC(10,2),
  vendida BOOLEAN DEFAULT FALSE,
  destacada BOOLEAN DEFAULT FALSE
);

-- Encargos table
CREATE TABLE IF NOT EXISTS encargos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  estilo TEXT,
  tamaño TEXT,
  uso TEXT CHECK (uso IN ('personal', 'regalo', 'comercial')),
  presupuesto_min NUMERIC(10,2),
  presupuesto_max NUMERIC(10,2),
  plazo TEXT,
  referencias TEXT,
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'en_contacto', 'aceptado', 'rechazado'))
);

-- Artista table (single row)
CREATE TABLE IF NOT EXISTS artista (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT,
  bio TEXT,
  foto_url TEXT,
  redes_sociales JSONB DEFAULT '{}',
  exposiciones JSONB DEFAULT '[]'
);

-- Row Level Security
ALTER TABLE obras ENABLE ROW LEVEL SECURITY;
ALTER TABLE encargos ENABLE ROW LEVEL SECURITY;
ALTER TABLE artista ENABLE ROW LEVEL SECURITY;

-- Obras: public read, no public write
CREATE POLICY "obras_public_read" ON obras FOR SELECT USING (true);

-- Encargos: no public read (only service role), insert allowed
CREATE POLICY "encargos_insert" ON encargos FOR INSERT WITH CHECK (true);

-- Artista: public read
CREATE POLICY "artista_public_read" ON artista FOR SELECT USING (true);

-- Storage bucket for obra images (run separately in Supabase dashboard)
-- Create bucket named "obras" with public access
